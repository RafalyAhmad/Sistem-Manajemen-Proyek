<?php

use App\Http\Controllers\ContractController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
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

Route::get('/users', function () {
    return Inertia::render('Users');
})->middleware(['auth', 'verified'])->name('users');

Route::get('/settings', function () {
    return Inertia::render('GeneralSettings');
})->middleware(['auth', 'verified'])->name('settings');

Route::get('/tickets', function () {
    return Inertia::render('Tickets');
})->middleware(['auth', 'verified'])->name('tickets');

Route::get('/timeline', function () {
    return Inertia::render('ProjectTimeline');
})->middleware(['auth', 'verified'])->name('timeline');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('projects', ProjectController::class);
});

// User control
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Project control
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{project}', [ProjectController::class, 'update']);
Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

// Feature control
Route::get('/features', [FeatureController::class, 'index']);
Route::post('/features', [FeatureController::class, 'store']);
Route::put('/features/{feature}', [FeatureController::class, 'update']);
Route::delete('/features/{feature}', [FeatureController::class, 'destroy']);

// Meeting control
Route::get('/meetings', [MeetingController::class, 'index']);
Route::post('/meetings', [MeetingController::class, 'store']);
Route::put('/meetings/{meeting}', [MeetingController::class, 'update']);
Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy']);

// Contract control
Route::get('/contracts', [ContractController::class, 'index']);
Route::post('/contracts', [ContractController::class, 'store']);
Route::put('/contracts/{contract}', [ContractController::class, 'update']);
Route::delete('/contracts/{contract}', [ContractController::class, 'destroy']);
Route::get('/contracts/{contract}/pdf', [ContractController::class, 'generatePdf'])
    ->name('contracts.pdf');


// Project Board
Route::get('/project-boards', [ContractController::class, 'index']);
Route::post('/project-boards', [ContractController::class, 'store']);

require __DIR__.'/auth.php';
