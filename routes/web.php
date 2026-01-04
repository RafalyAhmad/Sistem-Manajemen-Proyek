<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectBoardController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/notifications', function () {
    return Inertia::render('Notifications');
})->middleware(['auth', 'verified'])->name('notifications');

// Route::get('/users', function () {
//     return Inertia::render('Users');
// })->middleware(['auth', 'verified'])->name('users');

Route::get('/settings', function () {
    return Inertia::render('GeneralSettings');
})->middleware(['auth', 'verified'])->name('settings');

Route::get('/tickets', function () {
    return Inertia::render('Tickets');
})->middleware(['auth', 'verified'])->name('tickets');

Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
Route::delete('/tickets/{ticket}', [TicketController::class, 'destroy'])->name('tickets.destroy');
Route::patch('/tickets/{ticket}/status', [TicketController::class, 'updateStatus'])->name('tickets.update-status');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('projects', ProjectController::class);
});

// User control
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

// Project control
Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
// Feature control
Route::get('/features', [FeatureController::class, 'index'])->name('features.index');
Route::post('/features', [FeatureController::class, 'store'])->name('features.store');
Route::put('/features/{feature}', [FeatureController::class, 'update'])->name('features.update');
Route::delete('/features/{feature}', [FeatureController::class, 'destroy'])->name('features.destroy');

// Meeting control
Route::get('/meetings', [MeetingController::class, 'index'])->name('meetings.index');
Route::post('/meetings', [MeetingController::class, 'store'])->name('meetings.store');
Route::put('/meetings/{meeting}', [MeetingController::class, 'update'])->name('meetings.update');
Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy'])->name('meetings.destroy');

// Contract control
Route::get('/contracts', [ContractController::class, 'index'])->name('contracts.index');
Route::post('/contracts', [ContractController::class, 'store'])->name('contracts.store');
Route::put('/contracts/{contract}', [ContractController::class, 'update'])->name('contracts.update');
Route::delete('/contracts/{contract}', [ContractController::class, 'destroy'])->name('contracts.destroy');
Route::get('/contracts/{contract}/pdf', [ContractController::class, 'generatePdf'])
    ->name('contracts.pdf');

// Project Board
Route::get('/project-board', [ProjectBoardController::class, 'index'])->name('project.board');
Route::get('/project-board/{project}/features/{feature}', [ProjectBoardController::class, 'show'])->name('project.board.show');
Route::patch('/project-board/{project}/features/{feature}/status', [ProjectBoardController::class, 'updateStatus'])->name('project.board.update-status');
Route::delete('project-board/{project}/features/{feature}', [ProjectBoardController::class, 'destroy'])->name('project.board.destroy');
Route::post('/project-board/{project}/features', [ProjectBoardController::class, 'addFeature'])->name('project.board.add');
Route::post('/project-board/{project}/features/{feature}/fp-adjustment',[ProjectBoardController::class, 'storeFpAdjustment'])->name('project.board.fp-adjustment.store');

require __DIR__.'/auth.php';
