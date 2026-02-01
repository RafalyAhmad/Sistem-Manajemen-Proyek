<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('UserManagement', [
            'users' => User::with('roles')->get(),
            'roles' => Role::pluck('name'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'role' => 'required|exists:roles,name',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // SPATIE ROLE
        $user->assignRole($request->role);

        return redirect()->back();
    }

    public function update(Request $request, User $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'role' => 'required|exists:roles,name',
        ]);

        $id->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // update role
        $id->syncRoles([$request->role]);

        return redirect()->back();
    }

    public function destroy(User $id)
    {
        $id->delete();

        return redirect()->back();
    }
}
