<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $ticket = Ticket::with('user', 'project')->get();

        return Inertia::render('Tickets', [
            'tickets' => $ticket,
            'user' => User::select('id', 'name')->get(),
            'project' => Project::select('project_id', 'project_name')->get(),
        ]);
    }

    // CREATE
    public function create()
    {
        return Inertia::render('Tickets');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'status' => 'required|in:live,approve,decline',
            'timestamp' => 'required|date',
        ]);

        $ticket = Ticket::create($validatedData);
    }

    // UPDATE (Tampilkan form untuk mengedit)
    public function edit(Ticket $ticket)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
        ]);
    }

    // UPDATE (Simpan perubahan data)
    public function update(Request $request, Ticket $ticket)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'notulensi' => 'required|string|max:255',
            'status' => 'required|in:live,approved,declined',
            'timestamp' => 'required|date',
        ]);

        $ticket->update($validatedData);

        return redirect()->back()->with('success', 'berhasil diperbarui.');
    }

    // DELETE (Hapus data)
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return redirect()->back()->with('success', 'ticket berhasil dihapus.');
    }
}
