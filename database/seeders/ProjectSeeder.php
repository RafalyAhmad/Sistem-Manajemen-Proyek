<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // 1️⃣ Insert project (TANPA user_id)
        $projectData = [
            'project_name' => 'Aplikasi Manajemen Tugas (TaskMaster)',
            'initial_project_fee' => 3540000,
            'final_project_fee' => 4200000,
            'initial_project_time' => 118,
            'final_project_time' => 120,
            'description' => 'Pengembangan aplikasi web untuk mengelola tugas tim, mencakup fitur CRUD, notifikasi, dan pelaporan kemajuan.',
            'status' => 'in_progress',
            'total_cfp' => 28,
            'total_rcaf' => 46,
            'total_feature_fee' => 4,
            'total_feature_time' => 3,
            'working_hour_per_day' => 8,
            'development_cost_per_day' => 50000,
            'line_of_code_per_day' => 250,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        // PK = project_id
        $projectId = DB::table('projects')->insertGetId(
            $projectData,
            'project_id'
        );

        // 2️⃣ Assign users ke project (project_user)
        $userIds = [1, 2]; // PM + member

        foreach ($userIds as $userId) {
            DB::table('project_user')->insert([
                'project_id' => $projectId,
                'user_id' => $userId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 3️⃣ Assign feature ke project (feature_project)
        $features = [1, 2];

        foreach ($features as $featureId) {
            DB::table('feature_project')->insert([
                'project_id' => $projectId,
                'feature_id' => $featureId,
                'status' => 'to_do',
                'added_type' => 'baseline',
                'fp_adjustment' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
