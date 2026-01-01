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
        $meetings = Meeting::with('user', 'project')->get();

        return Inertia::render('MeetingManagement', [
            'meetings' => $meetings,
            'user' => User::select('id', 'name')->get(),
            'project' => Project::select('project_id', 'project_name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Meetings');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'meeting_time' => 'required|date',
            'email_to' => 'required|string|max:255',
        ]);
        $meeting = Meeting::create($validatedData);
        Mail::to($validatedData['email_to'])
            ->send(new MeetingInvitationMail($meeting));
    }

    public function edit(Meeting $meeting)
    {
        return Inertia::render('meeting/Edit', [
            'meeting' => $meeting,
        ]);
    }

    public function update(Request $request, Meeting $meeting)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'meeting_time' => 'required|date',
            'email_to' => 'required|string|max:255',
        ]);

        $meeting->update($validatedData);
    }

    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
    }
}
