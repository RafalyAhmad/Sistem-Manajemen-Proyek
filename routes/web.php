<?php

use App\Http\Controllers\ProfileController;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
