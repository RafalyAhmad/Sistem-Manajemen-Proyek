<?php

namespace App\Http\Controllers;

use App\Models\Feature;
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
        'fp_adjustment' => 0,
        'added_type' => 'change',
    ]);

    // $this->recalculateProjectFP($project);

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

        return back()->with('success', 'Status fitur berhasil diperbarui');
    }



    public function destroy(Project $project, Feature $feature)
    {
        $project->features()->detach($feature->feature_id);
    }
}
