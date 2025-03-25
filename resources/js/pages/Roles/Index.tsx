// resources/js/Pages/Roles/Index.tsx
import { usePage } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { PermissionButton } from "@/components/PermissionButton";

export default function RoleIndex() {
    const { roles } = usePage().props as unknown as { roles: Array<{ id: number, name: string }> };

    return (
        <div>
            <h1>Role Management</h1>
            {roles.map(role => (
                <div key={role.id}>
                    {role.name}
                    <Button>Edit</Button>
                </div>
            ))}

            <PermissionButton permission="create_user">
                <Button>Create User</Button>
            </PermissionButton>
        </div>
    );
}