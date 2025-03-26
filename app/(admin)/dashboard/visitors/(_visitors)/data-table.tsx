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
            id: "gender",
            title: "Genre",
            options: [
                { label: "Tous", value: "all" },
                { label: "Homme", value: "MALE" },
                { label: "Femme", value: "FEMALE" },
                { label: "Autre", value: "OTHER" },
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
                exportFileName="visiteurs-export"
            />
        </Suspense>
    );
}
