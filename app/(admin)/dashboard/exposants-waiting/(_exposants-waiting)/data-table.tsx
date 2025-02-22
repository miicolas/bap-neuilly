"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from "@tanstack/react-table";

import { DataTableProps } from "@/lib/type";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ExportExcel from "./export-excel";
import { ExposantAwaiting } from "@/lib/type";

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchParam = searchParams.get("search") || "";

    const [globalFilter, setGlobalFilter] = useState<string>(searchParam);

    useEffect(() => {
        if (searchParam) {
            setGlobalFilter(searchParam);
        }
    }, [searchParam]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        state: { globalFilter },
    });

    const handleFilterChange = (value: string) => {
        setGlobalFilter(value);

        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <Suspense fallback={<div>...</div>}>
            <div>
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Rechercher"
                        value={globalFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="max-w-sm"
                    />
                    <ExportExcel dataToExport={data as ExposantAwaiting[]} />
                </div>

                <div className="rounded-md border">
                    <Table className="bg-card">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Pas de données.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-end space-x-2 p-4 bg-card">
                        <Button variant="outline" size="sm" onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
                            Précédent
                        </Button>
                        <Button variant="outline" size="sm" onClick={table.nextPage} disabled={!table.getCanNextPage()}>
                            Suivant
                        </Button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
