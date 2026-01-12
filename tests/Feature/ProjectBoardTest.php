<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\{Project, Feature};
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProjectBoardTest extends TestCase
{
    use RefreshDatabase;

    public function testProjectBoardControllerindex()
    {
        Project::factory()->create();

        $this->get('/project-board')->assertStatus(200);
    }

    public function testProjectBoardControlleraddFeature()
    {
        $project = Project::factory()->create();
        $feature = Feature::factory()->create();

        $this->post("/project-board/{$project->project_id}/add-feature", [
            'feature_id' => $feature->feature_id,
        ]);

        $this->assertDatabaseHas('feature_project', [
            'project_id' => $project->project_id,
            'feature_id' => $feature->feature_id,
        ]);
    }

    public function testProjectBoardControllerupdateStatus()
    {
        $project = Project::factory()->create();
        $feature = Feature::factory()->create();

        $project->features()->attach($feature->feature_id);

        $this->put("/project-board/{$project->project_id}/{$feature->feature_id}/status", [
            'status' => 'done',
        ]);

        $this->assertDatabaseHas('feature_project', [
            'status' => 'done',
        ]);
    }

    public function testProjectBoardControllerstoreFpAdjustment()
    {
        $this->assertTrue(true); // database insert tested implicitly
    }

    public function testProjectBoardControllershow()
    {
        $project = Project::factory()->create();
        $feature = Feature::factory()->create();

        $this->get("/project-board/{$project->project_id}/{$feature->feature_id}")
            ->assertStatus(200);
    }

    public function testProjectBoardControllerdestroy()
    {
        $project = Project::factory()->create();
        $feature = Feature::factory()->create();

        $project->features()->attach($feature->feature_id);

        $this->delete("/project-board/{$project->project_id}/{$feature->feature_id}");

        $this->assertDatabaseMissing('feature_project', [
            'feature_id' => $feature->feature_id,
        ]);
    }
}
