"use client";

import { AdminDataTable } from "../../(_admin-components)/data-table";
import { DataTableProps } from "@/lib/type";
import { Suspense } from "react";

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    
    const filterableColumns = [
        {
            id: "status",
            title: "Statut",
            options: [
                { label: "Tous", value: "all" },
                { label: "En attente", value: "pending" },
            ],
        },
    ];

    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <AdminDataTable 
                columns={columns} 
                data={data} 
                filterableColumns={filterableColumns}
                exportData={true}
                exportFileName="exposants-en-attente-export"
            />
        </Suspense>
    );
}
