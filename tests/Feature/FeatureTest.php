<?php

namespace Tests\Feature;

use App\Models\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_feature_controllerindex()
    {
        // insert manual

        $response = $this->get('/features');

        $response->assertStatus(200);
    }

    public function test_feature_controllercreate()
    {
        $this->get('/features/create')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Features')
            );
    }

    public function test_feature_controllerstore()
    {
        $data = Feature::factory()->make()->toArray();

        $this->post('/features', $data);

        $this->assertDatabaseHas('features', [
            'feature_name' => $data['feature_name'],
        ]);
    }

    public function test_feature_controlleredit()
    {
        $feature = Feature::factory()->create();

        $this->get("/features/{$feature->feature_id}/edit")
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page->component('Feature/Edit')
                ->has('feature')
            );
    }

    public function test_feature_controllerupdate()
    {
        $feature = Feature::factory()->create();

        $this->put("/features/{$feature->feature_id}", [
            ...$feature->toArray(),
            'feature_name' => 'Updated Feature',
        ]);

        $this->assertDatabaseHas('features', [
            'feature_name' => 'Updated Feature',
        ]);
    }

    public function test_feature_controllerdestroy()
    {
        $feature = Feature::factory()->create();

        $this->delete("/features/{$feature->feature_id}");

        $this->assertDatabaseMissing('features', [
            'feature_id' => $feature->feature_id,
        ]);
    }
}
