<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        return inertia('Users/Index', [
            'users' => $users
        ]);
    }

    public function editRoles(User $user)
    {
        $allRoles = Role::all()->pluck('name');
        $userRoles = $user->roles->pluck('name');

        return Inertia::render('Users/EditRoles', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'allRoles' => $allRoles,
            'userRoles' => $userRoles,
        ]);
    }

    public function updateRoles(Request $request, User $user)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'string|exists:roles,name',
        ]);

        try {
            // Sync the roles (this will remove any roles not in the array and add new ones)
            $user->syncRoles($validated['roles']);

            return redirect()
                ->route('users.index')
                ->with('success', "Roles for {$user->name} updated successfully!");
                
        } catch (\Exception $e) {
            // Handle any errors that might occur
            return back()->with('error', 'Failed to update roles: ' . $e->getMessage());
        }
    }
}
