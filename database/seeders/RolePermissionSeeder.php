<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role as ModelsRole;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']); // create role admin
        Role::create(['name' => 'editor']); // create role editor
    
        Permission::create(['name' => 'create_post']); // create permission create_post
        Permission::create(['name' => 'edit_post']); // create permission edit_post
    }
}
