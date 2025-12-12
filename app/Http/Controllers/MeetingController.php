<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Meeting;
use App\Models\Project;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use function Laravel\Prompts\select;

class MeetingController extends Controller
{    public function index()
    {
        $meetings = Meeting::with('user','project')->get(); 
        return Inertia::render('MeetingManagement', [
            'meetings'=>$meetings,
            'user'=> User::select('id','name')->get(),
            'project'=> Project::select('project_id','project_name')->get()
        ]);
    }
    
    // CREATE 
    public function create()
    {
        return Inertia::render('Meetings');
    }

public function store(Request $request)
{
    $validatedData = $request->validate([
        'project_id' => 'required|exists:projects,project_id',
        'user_id' => 'required|exists:users,id',
        'title'=> 'required|string|max:255',
        'description'=> 'required|string|max:255',
        'notulensi'=> 'required|string|max:255',
        'meeting_time'=> 'required|date',
        'email_to'=> 'required|string|max:255',
    ]);

    Meeting::create($validatedData);

    return redirect()->back()->with('success', 'berhasil ditambahkan.');
}

    // UPDATE (Tampilkan form untuk mengedit)
    public function edit(Meeting $meeting)
    {
        return Inertia::render('meeting/Edit', [
            'meeting' => $meeting,
        ]);
    }

    // UPDATE (Simpan perubahan data)
   public function update(Request $request, Meeting $meeting)
{
    $validatedData = $request->validate([
       'project_id' => 'required|exists:projects,project_id',
        'user_id' => 'required|exists:users,id',
        'title'=> 'required|string|max:255',
        'description'=> 'required|string|max:255',
        'notulensi'=> 'required|string|max:255',
        'meeting_time'=> 'required|date',
        'email_to'=> 'required|string|max:255',
    ]);

    $meeting->update($validatedData);

    return redirect()->back()->with('success', 'berhasil diperbarui.');
}


    // DELETE (Hapus data)
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
    return redirect()->back()->with('success', 'meeting berhasil dihapus.');
    }
}
