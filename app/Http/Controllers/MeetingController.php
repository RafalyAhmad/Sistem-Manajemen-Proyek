<?php

namespace App\Http\Controllers;

use App\Mail\MeetingInvitationMail;
use App\Models\Meeting;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MeetingController extends Controller
{
    public function index()
    {
        // hanya tampilkan meeting dari project yang diikuti user login
        $meetings = Meeting::with('project')
            ->whereHas('project.users', function ($q) {
                $q->where('user_id', auth()->id());
            })
            ->get();

        return Inertia::render('MeetingManagement', [
            'meetings' => $meetings,
            'projects' => Project::select('project_id', 'project_name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Meetings', [
            'projects' => auth()->user()
                ->projects()
                ->select('project_id', 'project_name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'meeting_time' => 'required|date',
            'email_to' => 'nullable|string|max:255', 
        ]);

        $meeting = Meeting::create($validatedData);

        // ambil semua user dalam project
        $projectUsers = Project::with('users')
            ->find($request->project_id)
            ->users;

        $emails = $projectUsers
            ->pluck('email')
            ->filter()
            ->toArray();

        //  tambah email manual kalau diisi
        if (!empty($validatedData['email_to'])) {
            $emails[] = $validatedData['email_to'];
        }

        // kirim ke banyak email
        if (!empty($emails)) {
            Mail::to($emails)->send(new MeetingInvitationMail($meeting));
        }

        return redirect()->route('meetings.index');
    }

    public function edit(Meeting $meeting)
    {
        return Inertia::render('meeting/Edit', [
            'meeting' => $meeting->load('project'),
            'projects' => Project::select('project_id', 'project_name')->get(),
        ]);
    }

    public function update(Request $request, Meeting $meeting)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'meeting_time' => 'required|date',
            'email_to' => 'nullable|string|max:255',
        ]);

        $meeting->update($validatedData);

        return redirect()->route('meetings.index');
    }

    public function destroy(Meeting $meeting)
    {
        $meeting->delete();

        return redirect()->route('meetings.index');
    }
}
