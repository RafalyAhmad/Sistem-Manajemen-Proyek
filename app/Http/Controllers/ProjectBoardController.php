<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Feature_Project;
use App\Models\FpAdjustment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectBoardController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::select('project_id', 'project_name')->get();

        $projectId = $request->get('project_id', $projects->first()?->project_id);

        $project = Project::with(['features' => function ($q) {
            $q->withPivot('status');
        }])->find($projectId);

        $project->features->each(function ($feature) {
            $feature->fp_adjustments = DB::table('fpadjustment')
                ->where('feature_project_id', $feature->pivot->feature_project_id)
                ->get();
        });

        return Inertia::render('ProjectBoard', [
            'projects' => $projects,
            'project' => $project->load('features'),
            'features' => Feature::all(),
        ]);
    }

    public function addFeature(Request $request, Project $project)
    {
        $project->features()->attach($request->feature_id, [
            'status' => 'to_do',
            'added_type' => 'change',
            'fp_adjustment' => 0,
        ]);
    }

    public function updateStatus(Request $request, Project $project, Feature $feature)
    {
        $request->validate([
            'status' => 'required|in:to_do,in_progress,done',
        ]);

        DB::table('feature_project')
            ->where('project_id', $project->project_id)
            ->where('feature_id', $feature->feature_id)
            ->update([
                'status' => $request->status,
                'updated_at' => now(),
            ]);

    }

   public function storeFpAdjustment(Project $project, Feature $feature, Request $request)
{
    $request->validate([
        'fp_adjustment' => 'required|integer',
    ]);

    $featureProject = Feature_Project::where('project_id', $project->project_id)
        ->where('feature_id', $feature->feature_id)
        ->firstOrFail();

    $featureProject->update([
        'fp_adjustment' => $request->fp_adjustment,
    ]);

    return back();
}


    public function show(Project $project, Feature $feature, Feature_Project $featureProject)
    {

        $featureProject->load([
            'fpAdjustments',    // histori perubahan
        ]);

         // Ambil feature LEWAT relasi project (ini kuncinya)
        $feature = $project->features()
            ->where('features.feature_id', $feature->feature_id)
            ->firstOrFail();

        // Ambil feature_project ID dari pivot
        $featureProjectId = $feature->pivot->feature_project_id ?? null;

        $fpAdjustments = [];
        $fpAdjustmentTotal = 0;

        if ($featureProjectId) {
            $featureProject = Feature_Project::with('fpAdjustments')
                ->find($featureProjectId);

            $fpAdjustments = $featureProject->fpAdjustments;
            $fpAdjustmentTotal = $featureProject->fpAdjustments->sum('fp_delta');
        }

        return Inertia::render('ProjectBoardShow', [
            'project' => $project,
            'feature' => $feature,
            'fpAdjustments' => $featureProject->fpAdjustments,
            'fpAdjustmentTotal' => $featureProject->fpAdjustments->sum('fp_delta'),

        ]);
    }

    public function destroy(Project $project, Feature $feature)
    {
        $project->features()->detach($feature->feature_id);
    }
}
