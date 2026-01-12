<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Ticket;
use App\Models\User;

class TicketTest extends TestCase
{
    use RefreshDatabase;

    public function testTicketControllerindex()
    {
        $this->get('/tickets')->assertStatus(200);
    }

    public function testTicketControllercreate()
    {
        $this->get('/tickets/create')->assertStatus(200);
    }

    public function testTicketControllerstore()
    {
        $ticket = Ticket::factory()->make();

        $this->post('/tickets', $ticket->toArray());

        $this->assertDatabaseHas('tickets', [
            'title' => $ticket->title,
        ]);
    }

    public function testTicketControllerupdateStatus()
    {
        $ticket = Ticket::factory()->create();

        $this->put("/tickets/{$ticket->id}/status", [
            'status' => 'approve',
        ]);

        $this->assertDatabaseHas('tickets', [
            'status' => 'approve',
        ]);
    }

    public function testTicketControllerupdate()
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

    public function testTicketControllerdestroy()
    {
        $ticket = Ticket::factory()->create();

        $this->delete("/tickets/{$ticket->id}");

        $this->assertDatabaseMissing('tickets', [
            'id' => $ticket->id,
        ]);
    }
}

