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
        $this->withoutExceptionHandling();
       $response = $this->post('/features', [
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

    $response->assertStatus(200);
    }

    public function test_feature_controllerstore()
    {
       $this->withoutExceptionHandling();

    $response = $this->post('/features', [
        'feature_name'            => 'Pelaporan',
        'description'             => 'Generate laporan proyek',
        'external_input'          => 2,
        'external_output'         => 6,
        'logical_internal_file'   => 10,
        'external_interface_file' => 8,
        'external_inquiry'        => 4,
        'feature_cfp'             => 30,
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('features', [
        'feature_name' => 'Pelaporan',
        'feature_cfp'  => 30,
    ]);
    }

    public function test_feature_controlleredit() 
{
    $this->withoutExceptionHandling();
    $feature = \App\Models\Feature::create([
        'feature_name'            => 'Fitur Awal',
        'description'             => 'Deskripsi awal',
        'external_input'          => 1,
        'external_output'         => 1,
        'logical_internal_file'   => 1,
        'external_interface_file' => 1,
        'external_inquiry'        => 1,
        'feature_cfp'             => 5, 
    ]);

   $response = $this->put(route('features.update', $feature->feature_id), [
        'feature_name'            => 'Fitur Terupdate',
        'description'             => 'Deskripsi awal',
        'external_input'          => 1,
        'external_output'         => 1,
        'logical_internal_file'   => 1,
        'external_interface_file' => 1,
        'external_inquiry'        => 1,
        'feature_cfp'             => 5, 
        ]);

        $this->assertDatabaseHas('features', [
            'feature_name' => 'Fitur Terupdate',
        ]);
}

    public function test_feature_controllerupdate()
    {
        $feature = \App\Models\Feature::create([
        'feature_name'            => 'Fitur Awal',
        'description'             => 'Deskripsi awal',
        'external_input'          => 1,
        'external_output'         => 1,
        'logical_internal_file'   => 1,
        'external_interface_file' => 1,
        'external_inquiry'        => 1,
        'feature_cfp'             => 5, 
    ]);

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
        $feature = \App\Models\Feature::create([
        'feature_name'            => 'Fitur Awal',
        'description'             => 'Deskripsi awal',
        'external_input'          => 1,
        'external_output'         => 1,
        'logical_internal_file'   => 1,
        'external_interface_file' => 1,
        'external_inquiry'        => 1,
        'feature_cfp'             => 5, 
    ]);

        $this->delete("/features/{$feature->feature_id}");

        $this->assertDatabaseMissing('features', [
            'feature_name' => $feature->feature_name,
        ]);
    }
}
