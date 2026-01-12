<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class FeatureTest extends TestCase
{
    use RefreshDatabase;

    public function testFeatureControllerindex()
    {
        Feature::factory()->count(2)->create();

        $this->get('/features')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) =>
                $page->component('FeatureManagement')
                     ->has('features', 2)
            );
    }

    public function testFeatureControllercreate()
    {
        $this->get('/features/create')
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) =>
                $page->component('Features')
            );
    }

    public function testFeatureControllerstore()
    {
        $data = Feature::factory()->make()->toArray();

        $this->post('/features', $data);

        $this->assertDatabaseHas('features', [
            'feature_name' => $data['feature_name'],
        ]);
    }

    public function testFeatureControlleredit()
    {
        $feature = Feature::factory()->create();

        $this->get("/features/{$feature->feature_id}/edit")
            ->assertStatus(200)
            ->assertInertia(fn (Assert $page) =>
                $page->component('Feature/Edit')
                     ->has('feature')
            );
    }

    public function testFeatureControllerupdate()
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

    public function testFeatureControllerdestroy()
    {
        $feature = Feature::factory()->create();

        $this->delete("/features/{$feature->feature_id}");

        $this->assertDatabaseMissing('features', [
            'feature_id' => $feature->feature_id,
        ]);
    }
}
