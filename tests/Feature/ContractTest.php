<?php

namespace Tests\Feature;

use Tests\TestCase;

class ContractTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_contract_controllerindex(): void
    {
        $this->withoutExceptionHandling();
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllercreate(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllerstore(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllergeneratepdf(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controlleredit(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllerupdate(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }

    public function test_contract_controllerdestroy(): void
    {
        $response = $this->get('/contracts');

        $response->assertStatus(200);
    }
}
