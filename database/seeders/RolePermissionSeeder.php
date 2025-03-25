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
        $admin = ModelsRole::create(['name' => 'admin']);
        $editor = ModelsRole::create(['name' => 'editor']);
    
        $createPost = Permission::create(['name' => 'create_post']);
        $editPost = Permission::create(['name' => 'edit_post']);
    
        $admin->givePermissionTo([$createPost, $editPost]);
        $editor->givePermissionTo($editPost);
    }
}
