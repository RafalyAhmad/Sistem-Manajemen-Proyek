<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index()
    {
        $features = Feature::with('projects')->get(); // Ambil projects beserta relasi user

        return Inertia::render('FeatureManagement', [
            'features' => $features,
            'projects' => Project::select('project_id', 'project_name')->get(),
        ]);
    }

    // CREATE
    public function create()
    {
        return Inertia::render('Features');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'feature_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|in:approved,in_progress,done',
            'external_input' => 'required|numeric',
            'external_output' => 'required|numeric',
            'logical_internal_file' => 'required|numeric',
            'external_interface_file' => 'required|numeric',
            'external_inquiry' => 'required|numeric',
            'feature_cfp' => 'required|numeric',

            // 'initial_feature_fee' => 'required|numeric',
            // 'final_feature_fee' => 'required|numeric',
            // 'initial_feature_time' => 'required|numeric',
            // 'final_feature_time' => 'required|numeric',
        ]);
        Feature::create($validatedData);

        return redirect()->back()->with('success', 'Feature berhasil ditambahkan.');
    }

    // UPDATE (Tampilkan form untuk mengedit)
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => $feature,
        ]);
    }

    // UPDATE (Simpan perubahan data)
    public function update(Request $request, Feature $feature)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'feature_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|in:approved,in_progress,done',
            'external_input' => 'required|numeric',
            'external_output' => 'required|numeric',
            'logical_internal_file' => 'required|numeric',
            'external_interface_file' => 'required|numeric',
            'external_inquiry' => 'required|numeric',
            'feature_cfp' => 'required|numeric',
        ]);

        $feature->update($validatedData);

        return redirect()->back()->with('success', 'Feature berhasil diperbarui.');
    }

    // DELETE (Hapus data)
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return redirect()->back()->with('success', 'Feature berhasil dihapus.');
    }
}
