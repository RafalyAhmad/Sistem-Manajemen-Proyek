<?php

namespace Tests\Feature;

use App\Models\Meeting;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class MeetingTest extends TestCase
{
    use RefreshDatabase;

    public function test_meeting_controllerindex()
    {
        $this->get('/meetings')->assertStatus(200);
    }

    public function test_meeting_controllercreate()
    {
        $this->get('/meetings/create')->assertStatus(200);
    }

    public function test_meeting_controllerstore()
    {
        Mail::fake();

        $user = User::factory()->create();
        $project = Project::factory()->create();

        $this->post('/meetings', [
            'project_id' => $project->project_id,
            'user_id' => $user->id,
            'title' => 'Meeting',
            'description' => 'Desc',
            'notulensi' => 'Notes',
            'meeting_time' => now(),
            'email_to' => $user->email,
        ]);

        $this->assertDatabaseHas('meetings', [
            'title' => 'Meeting',
        ]);
    }

    public function test_meeting_controlleredit()
    {
        $meeting = Meeting::factory()->create();

        $this->get("/meetings/{$meeting->id}/edit")
            ->assertStatus(200);
    }

    public function test_meeting_controllerupdate()
    {
        $meeting = Meeting::factory()->create();

        $this->put("/meetings/{$meeting->id}", [
            ...$meeting->toArray(),
            'title' => 'Updated',
        ]);

        $this->assertDatabaseHas('meetings', [
            'title' => 'Updated',
        ]);
    }

    public function test_meeting_controllerdestroy()
    {
        $meeting = Meeting::factory()->create();

        $this->delete("/meetings/{$meeting->id}");

        $this->assertDatabaseMissing('meetings', [
            'id' => $meeting->id,
        ]);
    }
}
