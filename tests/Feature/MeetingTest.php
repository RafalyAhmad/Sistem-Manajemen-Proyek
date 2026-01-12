<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\{Meeting, Project, User};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

class MeetingTest extends TestCase
{
    use RefreshDatabase;

    public function testMeetingControllerindex()
    {
        $this->get('/meetings')->assertStatus(200);
    }

    public function testMeetingControllercreate()
    {
        $this->get('/meetings/create')->assertStatus(200);
    }

    public function testMeetingControllerstore()
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

    public function testMeetingControlleredit()
    {
        $meeting = Meeting::factory()->create();

        $this->get("/meetings/{$meeting->id}/edit")
            ->assertStatus(200);
    }

    public function testMeetingControllerupdate()
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

    public function testMeetingControllerdestroy()
    {
        $meeting = Meeting::factory()->create();

        $this->delete("/meetings/{$meeting->id}");

        $this->assertDatabaseMissing('meetings', [
            'id' => $meeting->id,
        ]);
    }
}
