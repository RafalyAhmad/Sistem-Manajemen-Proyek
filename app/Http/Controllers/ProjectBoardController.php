<?php

namespace App\Http\Controllers;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
            'project'  => $project,
        ]);
    }
}


