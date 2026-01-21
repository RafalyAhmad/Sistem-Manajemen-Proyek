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
        $this->withoutExceptionHandling();
        $user = User::create([
            'name' => 'dev',
            'email' => 'dev@mail.com',
            'password' => 'password',
            'role' => 'developer',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'dev@mail.com',
        ]);
    }

    public function test_user_controlleredit()
    {
        $user = User::create([
            'name' => 'dev',
            'email' => 'dev@mail.com',
            'password' => 'password',
            'role' => 'developer',
        ]);
        $this->put("/users/{$user->id}")->assertStatus(302);
    }

    public function test_user_controllerupdate()
    {
        $this->withoutExceptionHandling();
        \Spatie\Permission\Models\Role::create([
            'name' => 'developer',
        ]);

        $user = User::create([
            'name' => 'dev',
            'email' => 'dev@mail.com',
            'password' => 'password',
            'role' => 'developer',
        ]);

        $this->put("/users/{$user->id}", [
            'name' => 'Updated',
            'email' => $user->email,
            'password' => 'password',
            'role' => 'developer',
        ])->assertstatus(302);

    }

    public function test_user_controllerdestroy()
    {
        $user = User::create([
            'name' => 'dev',
            'email' => 'dev@mail.com',
            'password' => 'password',
            'role' => 'developer',
        ]);

        $this->delete("/users/{$user->id}")->assertStatus(302);

    }
}
