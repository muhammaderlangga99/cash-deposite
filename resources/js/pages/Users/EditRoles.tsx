import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PageProps {
    flash: {
        success?: string;
        error?: string;
    };
    user: {
        id: number;
        name: string;
        email: string;
    };
    allRoles: string[];
    userRoles: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Edit Roles',
        href: '#',
    },
];

export default function EditRoles({ user, allRoles, userRoles }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        roles: userRoles,
    });

    const [open, setOpen] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/users/${user.id}/roles`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Roles - ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-2xl font-bold">Edit Roles for {user.name}</h3>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">User Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <h4 className="font-medium">Roles</h4>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                        >
                                            {data.roles.length > 0
                                                ? `${data.roles.length} roles selected`
                                                : "Select roles..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-full p-0">
                                        <Command>
                                            <CommandInput placeholder="Search roles..." />
                                            <CommandEmpty>No role found.</CommandEmpty>
                                            <CommandGroup className="max-h-64 overflow-y-auto">
                                                {allRoles.map((role) => (
                                                    <CommandItem
                                                        key={role}
                                                        value={role}
                                                        onSelect={() => {
                                                            setData('roles', 
                                                                data.roles.includes(role)
                                                                    ? data.roles.filter(r => r !== role)
                                                                    : [...data.roles, role]
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                data.roles.includes(role)
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {role}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.roles && (
                                    <p className="text-sm font-medium text-destructive">
                                        {errors.roles}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {data.roles.map((role) => (
                                        <span
                                            key={role}
                                            className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}