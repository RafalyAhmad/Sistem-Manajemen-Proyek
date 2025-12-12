<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Feature;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    // READ (Tampilkan semua projects)
    public function index()
    {
        return Inertia::render('ProjectManagement', [
            'projects' => Project::with(['user', 'features'])->get(),
            'users' => User::select('id', 'name', 'email')->get(),
            'features' => Feature::select('feature_id as id', 'description','total_cfp')->get(),
        ]);
    }

    // CREATE FORM
    public function create()
    {
        return Inertia::render('Projects/Create', [
            'users' => User::select('id', 'name')->get(),
            'features' => Feature::select('feature_id as id', 'description')->get(),
        ]);
    }

    // STORE PROJECT NEW
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'project_name' => 'required|string|max:255',
            'initial_project_fee' => 'required|numeric|min:0',
            'initial_project_time' => 'required|date',
            'status' => 'required|in:in_progress,complete',
            'working_hour_per_day' => 'required|numeric|min:1',
            'development_cost_per_day' => 'required|numeric|min:1',
            'line_of_code_per_day' => 'required|numeric|min:1',

            // fitur harus array ID
            'features' => 'required|array',
            'features.*' => 'exists:features,feature_id',
        ]);

        // buat project
        $project = Project::create($validatedData);

        // hubungkan fitur
        $project->features()->sync($request->features);

        // return Redirect::route('projects.index')->with('success', 'Project berhasil ditambahkan.');
    }

    // EDIT FORM
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->load('features'),
            'users' => User::select('id', 'name')->get(),
            'features' => Feature::select('id', 'name')->get(),
        ]);
    }

    // SAVE UPDATE
    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'project_name' => 'required|string|max:255',
            'final_project_fee' => 'nullable|numeric|min:0',
            'final_project_time' => 'nullable|date',
            'status' => 'required|in:in_progress,complete',

            'features' => 'required|array',
            'features.*' => 'exists:features,id',
        ]);

        $project->update($validatedData);

        // update relasi fitur
        $project->features()->sync($request->features);

        return Redirect::route('projects.index')->with('success', 'Project berhasil diperbarui.');
    }

    // DELETE PROJECT
    public function destroy(Project $project)
    {
        $project->features()->detach(); // bersihkan pivot
        $project->delete();
        return Redirect::route('projects.index')->with('success', 'Project berhasil dihapus.');
    }
}
