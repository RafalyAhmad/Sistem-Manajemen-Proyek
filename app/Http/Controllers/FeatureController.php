<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Feature;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use function Laravel\Prompts\select;

class FeatureController extends Controller
{    public function index()
    {
        $features = Feature::with('project')->get(); // Ambil projects beserta relasi user
        return Inertia::render('FeatureManagement', [
            'features' => $features,
            'projects'=> Project::select('project_id','project_name')->get()
        ]);
    }
    
    // CREATE 
    public function create()
    {
        return Inertia::render('Features');
    }

public function store(Request $request)
{
    dd ($request->all());
    $validatedData = $request->validate([
        // Asumsi Feature harus memiliki relasi ke Project (project_id)
        'project_id' => 'required|exists:projects,project_id',
        'description' => 'required|string|max:255', // Nama Fitur
        'initial_feature_fee' => 'required|numeric|min:0',
        'initial_feature_time' => 'required|numeric|min:0', // Asumsi ini adalah hari/jam
        'status' => 'required|in:approved, in_progress, done',
        'external_input'=> 'required|numeric',
        'external_output'=> 'required|numeric',
        'logical_internal_file'=> 'required|numeric',
        'external_interface_file'=> 'required|numeric',
        'external_inquiry'=> 'required|numeric',
        // Hapus semua validasi properti Project yang tidak diperlukan.
    ]);
    Feature::create($validatedData);
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
            'project_name' => 'required|string|max:255',
            // ... Tambahkan validasi untuk field lain
            'final_project_fee' => 'nullable|numeric|min:0',
            'final_project_time' => 'nullable|date',
            'status' => 'required|in:in_progress,complete',
        ]);

        $feature->update($validatedData);

        return Redirect::route('feature.index')->with('success', 'berhasil diperbarui.');
    }

    // DELETE (Hapus data)
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return Redirect::route('feature.index')->with('success', 'Project berhasil dihapus.');
    }
}
