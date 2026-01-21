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
        $ticket = Ticket::create([
            'title' => 'Sample Ticket',
            'project_id' => 1,
            'user_id' => 1,
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
            'project_id' => 1,
            'user_id' => 1,
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
            'project_id' => 1,
            'user_id' => 1,
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
            'project_id' => 1,
            'user_id' => 1,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);

        $this->put("/tickets/{$ticket->ticket_id}", [
            'title' => 'Updated Ticket Title',
            'project_id' => 1,
            'user_id' => 1,
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
            'project_id' => 1,
            'user_id' => 1,
            'description' => 'This is a sample ticket description.',
            'status' => 'live',
        ]);

        $this->delete("/tickets/{$ticket->ticket_id}");

        $this->assertDatabaseMissing('tickets', [
            'title' => 'Sample Ticket',
        ]);
    }
}
