<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       // Pastikan Anda telah mengimpor model Project jika Anda menggunakan seeder standar
// use App\Models\Project;

// ... dalam metode run() dari DatabaseSeeder atau ProjectSeeder Anda

\App\Models\Project::create([
    'user_id' => 1, 
    'project_name' => 'Aplikasi Manajemen Tugas (TaskMaster)',
    'initial_project_fee' => 5000000,
    'final_project_fee' => 550000, 
    'initial_project_time' => '2025-10-01 09:00:00',
    'final_project_time' => '2025-12-15 17:30:00',     
    'description' => 'Pengembangan aplikasi web untuk mengelola tugas tim, mencakup fitur CRUD, notifikasi, dan pelaporan kemajuan.',
    'status' => 'complete',
    'total_cfp' => 3, 
    'total_rcaf' => 2, 
    'total_feature_fee' => 500000,
    'total_feature_time' => 80, 
    'created_at' => now(),
    'updated_at' => now(),
    'working_hour_per_day' => 8,
    'development_cost_per_day'=> 45000,
    'line_of_code_per_day'=> 250,
]); 
    }
}
