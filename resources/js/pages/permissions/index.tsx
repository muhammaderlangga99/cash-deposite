import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useMemo } from "react";
import { PageProps as InertiaPageProps, router } from '@inertiajs/core';
import { RowModel, Table, useReactTable, getCoreRowModel, createColumnHelper } from '@tanstack/react-table'
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: '/permission/create',
    },
];

interface Permission {
    id: number;
    name: string;
    created_at: string;
}


interface PageProps extends InertiaPageProps {
    permissions: Permission[];
}

export default function Permissions() {
    const { flash = {} } = usePage<{ flash: { success?: string } }>().props;
    const [showAlert, setShowAlert] = useState<boolean>(!!flash.success);
    const { permissions } = usePage<PageProps>().props;
    useEffect(() => {
        if (flash.success) {
          setShowAlert(true);
          const timer = setTimeout(() => setShowAlert(false), 3000); // Sembunyikan setelah 3 detik
          return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount atau flash berubah
        }
    }, [flash.success]);

    // Fungsi untuk update
    const handleUpdate = (id: number) => {
        router.get(`/permission/${id}/edit`); // Sesuaikan dengan route edit
    };

    // Fungsi untuk delete
    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this permission?")) {
          router.delete(`/permission/${id}/delete`);
        }
    };

    const columnHelper = createColumnHelper<Permission>();
    const columns = useMemo(
        () => [
          columnHelper.accessor("name", { header: "Name" }),
          columnHelper.accessor("created_at", { header: "Created At" }),
          columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => {
              const permission = info.row.original; // Ambil data permission dari row
              return (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(permission.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(permission.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              );
            },
          }),
        ],
        []
      );
    const table = useReactTable({
        data: permissions,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* flash */}
                {showAlert && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-sm lowercase relative" role="alert">
                    <span className="block sm:inline">{flash.success}</span>
                </div>}
                <div className="flex justify-between">
                  <h3 className='text-2xl font-bold'>Permissions</h3>
                  <button
                    onClick={() => router.get('/permission/create')}
                    className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Create
                  </button>
                </div>

                <table className="min-w-full rounded-xl overflow-hidden">
                  <thead className="bg-zinc-900 text-white text-sm">
                      {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                              <th key={header.id} className="border p-2">
                              {header.column.columnDef.header as string}
                              </th>
                          ))}
                          </tr>
                      ))}
                  </thead>
                  <tbody className="rounded-xl overflow-hidden">
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="border p-2">
                          {cell.column.id === "actions" && typeof cell.column.columnDef.cell === 'function' ? cell.column.columnDef.cell(cell.getContext()) : cell.renderValue()}
                          </td>
                      ))}
                      </tr>
                    ))}
                  </tbody>
                </table>  

            </div>
        </AppLayout>
    );
}