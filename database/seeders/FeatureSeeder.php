<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    public function run(): void
    {
        Feature::create([
            'project_id' => 1,
            'feature_name' => 'Manajemen Data',
            'description' => 'Dashboard untuk mengelola data proyek',
            'external_input' => 0,
            'external_output' => 4,
            'logical_internal_file' => 14,
            'external_interface_file' => 15,
            'external_inquiry' => 6,
            'feature_cfp' => 39,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // ===== Feature 2 =====
        Feature::create([
            'project_id' => 1,
            'feature_name' => 'Pelaporan',
            'description' => 'Generate laporan proyek',
            'external_input' => 2,
            'external_output' => 6,
            'logical_internal_file' => 10,
            'external_interface_file' => 8,
            'external_inquiry' => 4,
            'feature_cfp' => 30,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
