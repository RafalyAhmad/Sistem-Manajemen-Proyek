<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MeetingTest extends TestCase
{
    use RefreshDatabase;

    public function test_meeting_controllerindex()
    {
        $this->get('/meetings')->assertStatus(200);
    }

    public function test_meeting_controllerstore()
    {
        $this->withoutExceptionHandling();
        \Illuminate\Support\Facades\Mail::fake();

        $user = \App\Models\User::create([
            'name' => 'Ahmad Rafaly',
            'email' => 'rafaly@example.com',
            'password' => bcrypt('password123'),
        ]);

        $project = \App\Models\Project::create([
            'project_name' => 'Sistem Manajemen Proyek',
            'user_id' => $user->id,
            'initial_project_fee' => 3540000,
            'final_project_fee' => 4200000,
            'initial_project_time' => 118,
            'final_project_time' => 120,
            'description' => 'Pengembangan aplikasi web untuk mengelola tugas tim, mencakup fitur CRUD, notifikasi, dan pelaporan kemajuan.',
            'status' => 'in_progress',
            'total_cfp' => 28,
            'total_rcaf' => 46,
            'total_feature_fee' => 4,
            'total_feature_time' => 3,
            'working_hour_per_day' => 8,
            'development_cost_per_day' => 50000,
            'line_of_code_per_day' => 250,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->post('/meetings', [
            'project_id' => $project->project_id,
            'user_id' => $user->id,
            'title' => 'Diskusi Progres UAS',
            'description' => 'Membahas integrasi API dan Testing',
            'notulensi' => 'Draft awal notulensi',
            'meeting_time' => '2026-01-25 10:00:00',
            'email_to' => 'dosen@kampus.ac.id',
        ]);
        $this->assertDatabaseHas('meetings', [
            'title' => 'Diskusi Progres UAS',
            'email_to' => 'dosen@kampus.ac.id',
        ]);

        $response->assertStatus(200);
        \Illuminate\Support\Facades\Mail::assertSent(\App\Mail\MeetingInvitationMail::class);
    }

    public function test_meeting_controlleredit()
    {
        $meeting = \App\Models\Meeting::create([
            'project_id' => 1,
            'user_id' => 1,
            'title' => 'Diskusi Progres UAS',
            'description' => 'Membahas integrasi API dan Testing',
            'notulensi' => 'Draft awal notulensi',
            'meeting_time' => '2026-01-25 10:00:00',
            'email_to' => 'dosen@kampus.ac.id',
        ]);

        $response = $this->put(route('meetings.update', $meeting->meeting_id))->assertStatus(302);

    }

    public function test_meeting_controllerupdate()
    {
        $meeting = \App\Models\Meeting::create([
            'project_id' => 1,
            'user_id' => 1,
            'title' => 'Diskusi Progres UAS',
            'description' => 'Membahas integrasi API dan Testing',
            'notulensi' => 'Draft awal notulensi',
            'meeting_time' => '2026-01-25 10:00:00',
            'email_to' => 'dosen@kampus.ac.id',
        ]);

        $response = $this->put("/meetings/{$meeting->meeting_id}", [
            'project_id' => 1,
            'user_id' => 1,
            'title' => 'Diskusi Progres UAS - Update',
            'description' => 'Membahas integrasi API, Testing, dan Deployment',
            'notulensi' => 'Notulensi setelah update',
            'meeting_time' => '2026-01-26 11:00:00',
            'email_to' => 'dosen@kampus.ac.id',
        ]);

        $response->assertStatus(302);
    }

    public function test_meeting_controllerdestroy()
    {
        $meeting = \App\Models\Meeting::create([
            'project_id' => 1,
            'user_id' => 1,
            'title' => 'Diskusi Progres UAS',
            'description' => 'Membahas integrasi API dan Testing',
            'notulensi' => 'Draft awal notulensi',
            'meeting_time' => '2026-01-25 10:00:00',
            'email_to' => 'dosen@kampus.ac.id',
        ]);

        $this->delete("/meetings/{$meeting->meeting_id}");

        $this->assertDatabaseMissing('meetings', [
            'meeting_id' => $meeting->meeting_id,
        ]);
    }
}
