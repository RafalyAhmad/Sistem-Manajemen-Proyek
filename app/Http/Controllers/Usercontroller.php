<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('UserManagement', [
            'users' => User::select('id', 'name', 'email', 'role')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email|unique:users',
            'role'  => 'required'
        ]);

        User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'role'     => $request->role,
            'password' => bcrypt('12345678'),
        ]);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email',
            'role'  => 'required'
        ]);

        User::where('id', $id)
            ->update($request->only('name','email','role'));

        return redirect()->back();
    }

    public function destroy($id)
    {
        User::destroy($id);

        return redirect()->back();
    }
}
