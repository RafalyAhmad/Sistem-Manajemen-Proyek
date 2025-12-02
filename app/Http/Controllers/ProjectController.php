<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    // READ (Tampilkan semua projects)
    public function index()
    {
        $projects = Project::with('user')->get(); // Ambil projects beserta relasi user
        return Inertia::render('ProjectManagement', [
            'projects' => $projects,
            'users' => User::select('id', 'name', 'email', 'role')->get()

        ]);
    }

    // CREATE (Tampilkan form untuk membuat project baru)
    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    // CREATE (Simpan data project baru)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'project_name' => 'required|string|max:255',
            'initial_project_fee' => 'required|numeric|min:0',
            // ... Tambahkan validasi untuk field lain
            'initial_project_time' => 'required|date',
            'status' => 'required|in:in_progress,complete',
            'working_hour_per_day' => 'required|numeric|min:1',
            'development_cost_per_day' => 'required|numeric|min:1',
            'line_of_code_per_day' => 'required|numeric|min:1',
        ]);

        Project::create($validatedData);

        // return Redirect::route('projects')->with('success', 'Project berhasil ditambahkan.');
    }

    // UPDATE (Tampilkan form untuk mengedit project)
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    // UPDATE (Simpan perubahan data project)
    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'project_name' => 'required|string|max:255',
            // ... Tambahkan validasi untuk field lain
            'final_project_fee' => 'nullable|numeric|min:0',
            'final_project_time' => 'nullable|date',
            'status' => 'required|in:in_progress,complete',
        ]);

        $project->update($validatedData);

        return Redirect::route('projects.index')->with('success', 'Project berhasil diperbarui.');
    }

    // DELETE (Hapus data project)
    public function destroy(Project $project)
    {
        $project->delete();
        return Redirect::route('projects.index')->with('success', 'Project berhasil dihapus.');
    }
}