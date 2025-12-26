<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Project;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContractController extends Controller
{
    public function index()
    {
        $contracts = Contract::with('user', 'project')->get(); // Ambil projects beserta relasi user

        return Inertia::render('ContractManagement', [
            'contracts' => $contracts,
            'user' => User::select('id', 'name')->get(),
            'project' => Project::select('project_id', 'project_name')->get(),
        ]);

    }

    // CREATE
    public function create()
    {
        return Inertia::render('Contracts');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'contract_number' => 'required|string',
            'contract_date' => 'required|date',

        ]);

        Contract::create($validatedData);

        return redirect()->back()->with('success', 'berhasil ditambahkan.');
    }

    public function generatePdf(Contract $contract)
    {
        $contract->load('user', 'project');

        $pdf = Pdf::loadView('contracts.pdf', [
            'contract' => $contract,
        ]);

        // return $pdf->download('kontrak-' . $contract->contract_number . '.pdf');
        return $pdf->stream('kontrak.pdf');

    }

    // UPDATE (Tampilkan form untuk mengedit)
    public function edit(Contract $contract)
    {
        return Inertia::render('contract/Edit', [
            'contract' => $contract,
        ]);
    }

    // UPDATE (Simpan perubahan data)
    public function update(Request $request, Contract $contract)
    {
        $validatedData = $request->validate([
            'project_id' => 'required|exists:projects,project_id',
            'user_id' => 'required|exists:users,id',
            'contract_number' => 'required|string',
            'contract_date' => 'required|date',

        ]);

        $contract->update($validatedData);

        return redirect()->back()->with('success', 'berhasil diperbarui.');
    }

    // DELETE (Hapus data)
    public function destroy(Contract $contract)
    {
        $contract->delete();

        return redirect()->back()->with('success', 'berhasil dihapus.');
    }
}
