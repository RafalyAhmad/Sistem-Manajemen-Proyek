<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContractTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    public function test_contract_controllerindex(): void
    {
        $this->withoutExceptionHandling();
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllercreate(): void
    {

        $response = $this->post('/contracts', [
            'contract_number' => 'Kontrak A',
            'contract_date' => '2024-01-01',
            'user_id' => User::factory()->create()->id,
            'project_id' => Project::factory()->create()->project_id,
        ]);
        $response->assertStatus(200);
    }

    public function test_contract_controllerstore(): void
    {
        $response = $this->post('/contracts', [
            'contract_number' => 'Kontrak A',
            'contract_date' => '2024-01-01',
            'user_id' => User::factory()->create()->id,
            'project_id' => Project::factory()->create()->project_id,
        ]);
        $this->assertDatabaseHas('contracts', [
            'contract_number' => 'Kontrak A',
        ]);
    }

    public function test_contract_controllergeneratepdf(): void
    {
        $contract = $this->post('/contracts', [
            'contract_number' => 'Kontrak A',
            'contract_date' => '2024-01-01',
            'user_id' => User::factory()->create()->id,
            'project_id' => Project::factory()->create()->project_id, ]);
        $contract = \App\Models\Contract::latest()->first();
        $response = $this->get("/contracts/{$contract->contract_id}/pdf");
        $response->assertStatus(200);
    }

    public function test_contract_controllerupdate(): void
    {
        $contract = $this->post('/contracts', [
            'contract_number' => 'Kontrak A',
            'contract_date' => '2024-01-01',
            'user_id' => User::factory()->create()->id,
            'project_id' => Project::factory()->create()->project_id, ]);
        $contract = \App\Models\Contract::latest()->first();

        $response = $this->put("/contracts/{$contract->contract_id}", [
            'contract_number' => 'Kontrak B',
            'contract_date' => '2024-02-01',
            'user_id' => $contract->user_id,
            'project_id' => $contract->project_id,
        ]);
        $response->assertStatus(302);
    }

    public function test_contract_controllerdestroy(): void
    {
        $contract = $this->post('/contracts', [
            'contract_number' => 'Kontrak A',
            'contract_date' => '2024-01-01',
            'user_id' => User::factory()->create()->id,
            'project_id' => Project::factory()->create()->project_id, ]);
        $contract = \App\Models\Contract::latest()->first();

        $response = $this->delete("/contracts/{$contract->contract_id}");
        $response->assertStatus(302);
    }
}
