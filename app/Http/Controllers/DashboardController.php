<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalDeveloper = User::role('developer')->count();

        $totalClient = User::role('client')->count();
        $totalProject = Project::count();

        $totalFeatureDone = DB::table('feature_project')
            ->where('status', 'done')
            ->count();

        $totalFeatureNotDone = DB::table('feature_project')
            ->where('status', '!=', 'done')
            ->count();

        return Inertia::render('Dashboard', [
            'totalDeveloper' => $totalDeveloper,
            'totalClient' => $totalClient,
            'totalProject' => $totalProject,
            'totalFeatureDone' => $totalFeatureDone,
            'totalFeatureNotDone' => $totalFeatureNotDone,
        ]);
    }
}
