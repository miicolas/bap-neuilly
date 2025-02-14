"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table";

import { DataTableProps } from "@/lib/type";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ExportExcel from "./export-excel";

export function DataTable<TData extends { ticketNumber: string; lastName: string; person: number }, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const ticketNumberParam = searchParams.get("ticketNumber") || "";

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        ticketNumberParam ? [{ id: "ticketNumber", value: ticketNumberParam }] : []
    );

    useEffect(() => {
        if (ticketNumberParam) {
            setColumnFilters([{ id: "ticketNumber", value: ticketNumberParam }]);
        }
    }, [ticketNumberParam]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: { columnFilters },
    });

    const handleFilterChange = (value: string) => {
        table.getColumn("ticketNumber")?.setFilterValue(value);

        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("ticketNumber", value);
        } else {
            params.delete("ticketNumber");
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Filter ticketNumber..."
                        value={table.getColumn("ticketNumber")?.getFilterValue() as string || ""}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="max-w-sm"
                    />
                    <ExportExcel dataToExport={data} />
                </div>

                <div className="rounded-md border">
                    <Table>
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
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-end space-x-2 p-4">
                        <Button variant="outline" size="sm" onClick={table.previousPage} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={table.nextPage} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
