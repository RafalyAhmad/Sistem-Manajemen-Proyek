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

    public function storeFpAdjustment(Request $request)
    {
        $request->validate([
            'feature_project_id' => 'required|exists:feature_project,feature_project_id',
            'fp_delta' => 'required|integer',
            'description' => 'required|string',
        ]);

        FpAdjustment::create([
            'feature_project_id' => $request->feature_project_id,
            'fp_delta' => $request->fp_delta,
            'description' => $request->description,
        ]);
    }

    public function show(Project $project, Feature $feature, Feature_Project $featureProject)
    {

        $featureProject->load([
            'fpAdjustments',    // histori perubahan
        ]);

        $project->load('features');

        return Inertia::render('ProjectBoardShow', [
            'project' => $project,
            'feature' => $feature,
            'fpAdjustments' => $featureProject->fpAdjustments,
        ]);

    }

    public function destroy(Project $project, Feature $feature)
    {
        $project->features()->detach($feature->feature_id);
    }
}
