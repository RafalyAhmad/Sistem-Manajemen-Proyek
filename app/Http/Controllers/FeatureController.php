<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Feature;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class FeatureController extends Controller
{
    // READ (Tampilkan semua projects)
    public function index()
    {
        $features = Feature::with('project')->get(); // Ambil projects beserta relasi user
        return Inertia::render('FeatureManagement', [
            'features' => $features
        ]);
    }

    // CREATE (Tampilkan form untuk membuat project baru)
    public function create()
    {
        return Inertia::render('Features');
    }

    // CREATE (Simpan data project baru)
   // FeatureController.php

// ...

public function store(Request $request)
{
    $validatedData = $request->validate([
        // Asumsi Feature harus memiliki relasi ke Project (project_id)
        'description' => 'required|string|max:255', // Nama Fitur
        'initial_feature_fee' => 'required|numeric|min:0',
        'initial_feature_time' => 'required|numeric|min:0', // Asumsi ini adalah hari/jam
        'status' => 'required|in:in_progress,complete',
        // Hapus semua validasi properti Project yang tidak diperlukan.
    ]);

    Feature::create($validatedData);

    return Redirect::route('feature.index')->with('success', 'Fitur berhasil ditambahkan.');
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
