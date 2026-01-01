<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index()
    {
        $features = Feature::all();

        return Inertia::render('FeatureManagement', [
            'features' => $features,
        ]);
    }

    public function create()
    {
        return Inertia::render('Features');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'feature_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'external_input' => 'required|numeric',
            'external_output' => 'required|numeric',
            'logical_internal_file' => 'required|numeric',
            'external_interface_file' => 'required|numeric',
            'external_inquiry' => 'required|numeric',
            'feature_cfp' => 'required|numeric',
        ]);
        Feature::create($validatedData);
    }

    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => $feature,
        ]);
    }

    public function update(Request $request, Feature $feature)
    {
        $validatedData = $request->validate([
            'feature_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'external_input' => 'required|numeric',
            'external_output' => 'required|numeric',
            'logical_internal_file' => 'required|numeric',
            'external_interface_file' => 'required|numeric',
            'external_inquiry' => 'required|numeric',
            'feature_cfp' => 'required|numeric',
        ]);

        $feature->update($validatedData);
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();
    }
}
