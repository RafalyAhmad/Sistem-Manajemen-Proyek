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
        ]);
        $validatedData['status'] = 'live';
        $ticket = Ticket::create($validatedData);
    }

    public function updateStatus(Request $request, Ticket $ticket)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:live,approve,decline',
        ]);

        $ticket->update($validatedData);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|in:live,approve,decline',
        ]);

        $ticket->update($validatedData);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
    }
}
