<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    public function definition(): array
    {
        return [
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
    }
}