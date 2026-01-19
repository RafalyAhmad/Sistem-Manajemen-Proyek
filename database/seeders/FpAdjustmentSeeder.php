<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FpAdjustmentSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('fpadjustment')->insert([
            [
                'feature_project_id' => 1,
                'fp_delta' => 5,
                'description' => 'Penyesuaian kompleksitas modul autentikasi',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'feature_project_id' => 1,
                'fp_delta' => -2,
                'description' => 'Pengurangan scope pada fitur laporan',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
