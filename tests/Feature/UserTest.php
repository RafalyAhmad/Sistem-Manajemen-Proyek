<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use App\Models\Feature;


class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testUserControllerindex()
    {
        $this->get('/users')->assertStatus(200);
    }

    public function testUserControllerstore()
    {
        $this->post('/users', [
            'name' => 'Test',
            'email' => 'test@mail.com',
            'password' => 'password',
            'role' => 'admin',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@mail.com',
        ]);
    }

    public function testUserControllerupdate()
    {
        $user = User::factory()->create();

        $this->put("/users/{$user->id}", [
            'name' => 'Updated',
            'email' => $user->email,
            'role' => 'admin',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Updated',
        ]);
    }

    public function testUserControllerdestroy()
    {
        $user = User::factory()->create();

        $this->delete("/users/{$user->id}");

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
