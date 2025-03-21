import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permission/create',
    },
];

export default function CreatePermissions() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('permission.store'), {
            onFinish: () => reset('name'),
        });
    }

    const { auth } = usePage<SharedData>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h3 className='text-2xl font-bold'>Buat Role Baru</h3>
                <form onSubmit={submit} className="gap-y-2 flex flex-col max-w-md">
                        <Label htmlFor="name">Nama Role</Label>
                        <Input
                            id="name"
                            type="name"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="admin"
                        />
                        <InputError message={errors.name} />
                    <button type="submit" className="w-26 bg-zinc-800 dark:bg-bg-zinc-200 cursor-pointer text-sm py-1 px-2 rounded-md text-white dark:text-black" disabled={processing}>
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
