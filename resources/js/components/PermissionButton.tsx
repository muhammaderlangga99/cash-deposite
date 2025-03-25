import { usePage } from "@inertiajs/react";

interface PermissionButtonProps {
    permission: string;
    children: React.ReactNode;
}

export function PermissionButton({ permission, children }: PermissionButtonProps) {
    const { auth } = usePage<{ auth: { user: { permissions: string[] } } }>().props;
    const userPermissions = auth.user.permissions;

    if (!userPermissions.includes(permission)) return null;

    return <>{children}</>;
}