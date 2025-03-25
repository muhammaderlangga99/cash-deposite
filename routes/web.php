<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\PermissionController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/permission', [PermissionController::class, 'index'])->name('permissions.index');
    Route::get('/permission/create', [PermissionController::class, 'create'])->name('permissions.create');
    Route::post('/permission/store', [PermissionController::class, 'store'])->name('permission.store');
    Route::get('/permission/{id}/edit', [PermissionController::class, 'edit'])->name('permission.edit');
    Route::put('/permission/{id}/update', [PermissionController::class, 'update'])->name('permission.update');
    Route::delete('/permission/{id}/delete', [PermissionController::class, 'destroy'])->name('permission.delete');
    Route::get('/permission/show/{id}', [PermissionController::class, 'show'])->name('permission.show');
    Route::get('/test-admin', function () {
        return 'THIS IS ADMIN AREA';
    })->middleware(['auth', 'role:admin']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
