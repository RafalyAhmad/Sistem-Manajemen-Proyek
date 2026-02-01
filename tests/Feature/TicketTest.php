<?php

namespace Tests\Feature;

use App\Models\Ticket;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function test_ticket_controllerindex()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
                     ->get('/tickets')->assertStatus(200);
    }

    public function test_ticket_controllercreate()
    {
        $this->withoutExceptionHandling();
        $ticket = Ticket::create([
            'title' => 'Sample Ticket',
            'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);
        $this->assertDatabaseHas('tickets', [
            'title' => 'Sample Ticket',
        ]);
    }

    public function test_ticket_controllerstore()
    {
        $ticket = Ticket::create([
            'title' => 'Sample Ticket',
            'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);
        $this->assertDatabaseHas('tickets', [
            'title' => 'Sample Ticket',
        ]);
    }

    public function test_ticket_controllerupdate_status()
    {
        $ticket = Ticket::create([
            'title' => 'Sample Ticket',
            'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);

        $this->put("/tickets/{$ticket->ticket_id}/status", [
            'status' => 'approve',
        ]);

        $this->assertDatabaseHas('tickets', [
            'status' => 'live',
        ]);
    }

    public function test_ticket_controllerupdate()
    {
        $ticket = Ticket::create([
            'title' => 'Updated Ticket Title',
           'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);

        $this->put("/tickets/{$ticket->ticket_id}", [
            'title' => 'Updated Ticket Title',
            'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is an updated ticket description.',
            'status' => 'live',
        ]);

        $this->assertDatabaseHas('tickets', [
            'title' => 'Updated Ticket Title',
        ]);
    }

    public function test_ticket_controllerdestroy()
    {
        $ticket = Ticket::create([
            'title' => 'Sample Ticket',
           'project_id' => Project::factory()->create()->project_id,
            'user_id' => User::factory()->create()->id,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);

        $this->delete("/tickets/{$ticket->ticket_id}");

        $this->assertDatabaseMissing('tickets', [
            'title' => 'Sample Ticket',
        ]);
    }
}
