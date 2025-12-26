<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    // READ (Tampilkan semua projects)
    public function index()
    {
        return Inertia::render('ProjectManagement', [
            'projects' => Project::with(['user', 'features'])->get(),
            'users' => User::select('id', 'name')->get(),
            'features' => Feature::select('feature_id as id', 'feature_name', 'feature_cfp')->get(),
        ]);
    }

    public function show(Project $project)
    {
        $project->load('features');

        return Inertia::render('ProjectShow', [
            'project' => $project,
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
            'initial_project_fee' => 'required|numeric',
            'final_project_fee' => 'required|numeric',
            'initial_project_time' => 'required|numeric',
            'final_project_time' => 'required|numeric',
            'description' => 'required|string',
            'status' => 'required|in:in_progress,complete',
            'total_cfp' => 'required|numeric',
            'total_rcaf' => 'required|numeric',
            'total_feature_fee' => 'required|numeric',
            'total_feature_time' => 'required|numeric',
            'working_hour_per_day' => 'required|numeric|min:1',
            'development_cost_per_day' => 'required|numeric|min:1',
            'line_of_code_per_day' => 'required|numeric|min:1',
            // fitur harus array ID
            'features' => 'required|array',
            'features.*' => 'exists:features,feature_id',
        ]);
        $project = Project::create($validatedData);

        // hubungkan fitur
        $project->features()->sync($request->features);
        foreach ($request->features as $featureId) {
    $project->features()->attach($featureId, [
        'status' => 'to_do',
        'fp_adjustment' => 0,
        'added_type' => 'baseline',
        'added_at' => now(),
    ]);
}


        // return Redirect::route('projects.index')->with('success', 'Project berhasil ditambahkan.');
    }

    // EDIT FORM
    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project->load('features'),
            'users' => User::select('id', 'name')->get(),
            'features' => Feature::select('feature_id', 'feature_name')->get(),
        ]);
    }

    // SAVE UPDATE
    public function update(Request $request, Project $project)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'project_name' => 'required|string|max:255',
            'initial_project_fee' => 'required|numeric|min:0',
            'final_project_fee' => 'required|numeric',
            'initial_project_time' => 'required|numeric',
            'final_project_time' => 'required|numeric',
            'description' => 'required|string',
            'status' => 'required|in:in_progress,complete',
            'total_cfp' => 'required|numeric',
            'total_rcaf' => 'required|numeric',
            'total_feature_fee' => 'required|numeric',
            'total_feature_time' => 'required|numeric',
            'working_hour_per_day' => 'required|numeric|min:1',
            'development_cost_per_day' => 'required|numeric|min:1',
            'line_of_code_per_day' => 'required|numeric|min:1',
            // fitur harus array ID
            'features' => 'required|array',
            'features.*' => 'exists:features,feature_id',
        ]);

        $project->update($validatedData);

        // update relasi fitur
        $project->features()->sync($request->features);

        // return Redirect::route('projects.index')->with('success', 'Project berhasil diperbarui.');
    }

    // DELETE PROJECT
    public function destroy(Project $project)
    {
        $project->features()->detach(); // bersihkan pivot
        $project->delete();
        // return Redirect::route('projects.index')->with('success', 'Project berhasil dihapus.');
    }
}
