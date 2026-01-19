<?php

namespace Tests\Feature;

use App\Models\Ticket;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function test_ticket_controllerindex()
    {
        $this->get('/tickets')->assertStatus(200);
    }

    public function test_ticket_controllercreate()
    {
        $this->get('/tickets/create')->assertStatus(200);
    }

    public function test_ticket_controllerstore()
    {
        $ticket = Ticket::factory()->make();

        $this->post('/tickets', $ticket->toArray());

        $this->assertDatabaseHas('tickets', [
            'title' => $ticket->title,
        ]);
    }

    public function test_ticket_controllerupdate_status()
    {
        $ticket = Ticket::factory()->create();

        $this->put("/tickets/{$ticket->id}/status", [
            'status' => 'approve',
        ]);

        $this->assertDatabaseHas('tickets', [
            'status' => 'approve',
        ]);
    }

    public function test_ticket_controllerupdate()
    {
        $ticket = Ticket::factory()->create();

        $this->put("/tickets/{$ticket->id}", [
            ...$ticket->toArray(),
            'status' => 'decline',
        ]);

        $this->assertDatabaseHas('tickets', [
            'status' => 'decline',
        ]);
    }

    public function test_ticket_controllerdestroy()
    {
        $ticket = Ticket::factory()->create();

        $this->delete("/tickets/{$ticket->id}");

        $this->assertDatabaseMissing('tickets', [
            'id' => $ticket->id,
        ]);
    }
}
