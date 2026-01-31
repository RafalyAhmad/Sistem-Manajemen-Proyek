<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
   public function index()
{
    $tickets = Ticket::with([
            'project',
            'creator:id,name' 
        ])
        ->whereHas('project.users', function ($q) {
            $q->where('user_id', auth()->id());
        })
        ->get();

    return Inertia::render('Tickets', [
        'tickets' => $tickets,
        'projects' => auth()->user()
            ->projects()
            ->select('projects.project_id', 'projects.project_name')
            ->get(),
    ]);
}

    public function create()
    {
        return Inertia::render('Tickets', [
            'projects' => auth()->user()
                ->projects()
                ->select('project_id', 'project_name')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        $validatedData['status'] = 'live';

        // ✅ set pembuat otomatis
        $validatedData['user_id'] = auth()->id(); 
        // atau created_by kalau kamu rename kolomnya

        Ticket::create($validatedData);

        return redirect()->route('tickets.index');
    }

    public function updateStatus(Request $request, Ticket $ticket)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:live,approve,decline',
        ]);

        $ticket->update($validatedData);

        return back();
    }

    public function update(Request $request, Ticket $ticket)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'status' => 'required|in:live,approve,decline',
        ]);

        $ticket->update($validatedData);

        return redirect()->route('tickets.index');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return back();
    }
}
