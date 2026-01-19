<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_controllerindex()
    {
        $this->get('/users')->assertStatus(200);
    }

    public function test_user_controllerstore()
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

    public function test_user_controllerupdate()
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

    public function test_user_controllerdestroy()
    {
        $user = User::factory()->create();

        $this->delete("/users/{$user->id}");

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
