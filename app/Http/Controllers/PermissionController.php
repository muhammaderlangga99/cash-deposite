<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('permissions/index', [
            'permissions' => Permission::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('permissions/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'name' => 'required|unique:permissions|min:3'
        ]);

        if ($validator->passes()) { // jika validasi sukses
            Permission::create($request->all()); // simpan data ke database
            return redirect()->route('permissions.index')->with('success', 'Permission created successfully.');
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('permissions/edit', [
            'permission' => Permission::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [ 
            'name' => 'required|unique:permissions|min:3'
        ]);

        if ($validator->passes()) { // jika validasi sukses
            Permission::find($id)->update($request->all()); // update data ke database
            return redirect()->route('permissions.index')->with('success', 'Permission updated successfully.');
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Permission::find($id)->delete();
        return redirect()->route('permissions.index')->with('success', 'Permission deleted successfully.');
    }
}
