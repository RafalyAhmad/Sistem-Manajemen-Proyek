<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view project',
            'create project',
            'edit project',
            'delete project',
            'update progress'
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ROLES
        $pm = Role::firstOrCreate(['name' => 'project manager']);
        $dev = Role::firstOrCreate(['name' => 'developer']);
        $client = Role::firstOrCreate(['name' => 'client']);

        // ATTACH PERMISSION ke ROLE
        $pm->givePermissionTo(Permission::all());

        $dev->givePermissionTo([
            'view project',
            'update progress'
        ]);

        $client->givePermissionTo([
            'view project'
        ]);
    }
}

