<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_name' => $this->faker->sentence(3),
            'user_id' => \App\Models\User::factory(), // Otomatis buat user jika belum ada
            'initial_project_fee' => 3000000,
            'final_project_fee' => 4000000,
            'initial_project_time' => 100,
            'final_project_time' => 120,
            'description' => $this->faker->paragraph,
            'status' => 'in_progress',
            'total_cfp' => 20,
            'total_rcaf' => 40,
            'total_feature_fee' => 5,
            'total_feature_time' => 5,
            'working_hour_per_day' => 8,
            'development_cost_per_day' => 50000,
            'line_of_code_per_day' => 250,
        ];
    }
}
