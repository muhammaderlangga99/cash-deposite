<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    protected $fillable = ['name', 'guard_name'];

    // Contoh custom method
    public function canAccess(string $permission): bool
    {
        return $this->permissions()->where('name', $permission)->exists();
    }
}
