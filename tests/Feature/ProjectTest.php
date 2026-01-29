<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Project;
use App\Models\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;

class ProjectTest extends TestCase
{
   use RefreshDatabase;

    public function test_project_controllerindex(): void
    {
        $response = $this->get('/projects');
        $response->assertStatus(200);
    }
    public function test_project_controllercreate(): void
    {
        $project = Project::factory()->create();
        $response = $this->get('/projects/create');
        $response->assertStatus(302);
    }
    public function test_project_controllerstore(): void
    {
        $project = Project::factory()->create();
        $this->assertDatabaseHas('projects', [
            'project_id' => $project->project_id,
        ]);
    }
    public function test_project_controllershow(): void
    {
        $project = Project::factory()->create();
        $response = $this->get("/projects/{$project->project_id}")->assertStatus(200);
    }
    public function test_project_controlleredit(): void
    {
        $project = Project::factory()->create();
        $response = $this->get("/projects/{$project->project_id}/edit");
        $response->assertStatus(302);
    }
    public function test_project_controllerupdate(): void
    {
        $project = Project::factory()->create();
        $feature = Feature::factory()->create();
        $response = $this->put("/projects/{$project->project_id}", [
            'project_name' => fake()->company(),
            'description' => fake()->text(),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'status' => 'in_progress',
            'updated_at' => now(),
            'created_at' => now(),
            'user_id' => User::factory()->create()->id,
            'total_cfp' => fake()->numberBetween(1000, 10000),
            'total_rcaf' => fake()->numberBetween(100, 500),
            'initial_project_fee' => fake()->numberBetween(5000, 20000),
            'final_project_fee' => fake()->numberBetween(10000, 50000),
            'initial_project_time' => fake()->numberBetween(1, 12),
            'final_project_time' => fake()->numberBetween(13, 24),
            'total_feature_fee' => 5,
            'total_feature_time' => 5,
            'working_hour_per_day' => 8,
            'development_cost_per_day' => 50000,
            'line_of_code_per_day' => 250, 
            'features' => [$feature->feature_id],
            ]);
            $project->features()->attach($feature->feature_id, [
            'status' => 'to_do',
            'added_type' => 'baseline',
            'fp_adjustment' => 0,  
        ]);
        $this->assertDatabaseHas('projects', [
            'project_id' => $project->project_id,
        ]);
    }
    public function test_project_controllerdestroy(): void
    {
        $project = Project::factory()->create();
       $this->delete("projects/{$project->project_id}")->assertStatus(200);
    }
}
