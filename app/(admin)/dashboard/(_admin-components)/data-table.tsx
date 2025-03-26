"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";

import { DataTableProps } from "@/lib/type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Filter,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AdminDataTable<TData, TValue>({
    columns,
    data,
    filterableColumns = [],
    exportData,
}: DataTableProps<TData, TValue> & {
    filterableColumns?: {
        id: string;
        title: string;
        options: { label: string; value: string }[];
    }[];
    searchableColumns?: { id: string; title: string }[];
    exportData?: boolean;
    exportFileName?: string;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );

    const searchParam = searchParams.get("search") || "";
    const [globalFilter, setGlobalFilter] = useState<string>(searchParam);

    const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
        {}
    );

    useEffect(() => {
        if (searchParam) {
            setGlobalFilter(searchParam);
        }
    }, [searchParam]);

    useEffect(() => {
        const newActiveFilters: Record<string, string> = {};
        for (const filter of columnFilters) {
            if (
                filter.value !== undefined &&
                filter.value !== null &&
                filter.value !== ""
            ) {
                newActiveFilters[filter.id] = String(filter.value);
            }
        }
        setActiveFilters(newActiveFilters);
    }, [columnFilters]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        enableColumnFilters: true,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
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

    const handleColumnFilterChange = (columnId: string, value: string) => {
        if (value === "all") {
            table.getColumn(columnId)?.setFilterValue(undefined);
        } else {
            table.getColumn(columnId)?.setFilterValue(value);
        }
    };

    const removeFilter = (columnId: string) => {
        table.getColumn(columnId)?.setFilterValue(undefined);
    };

    const getFilterTitle = (columnId: string) => {
        const column = filterableColumns.find((col) => col.id === columnId);
        return column?.title || columnId;
    };

    const getFilterValueLabel = (columnId: string, value: string) => {
        const column = filterableColumns.find((col) => col.id === columnId);
        const option = column?.options.find((opt) => opt.value === value);
        return option?.label || value;
    };

    const handleExport = () => {
        if (!exportData || !data.length) return;
    };

    const availableColumns = table.getAllColumns().map((col) => col.id);

    const validFilterableColumns = filterableColumns.filter((col) =>
        availableColumns.includes(col.id)
    );

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="px-6 pb-0">
                <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-xl font-semibold">
                        Données
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {exportData && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleExport}
                                className="flex items-center gap-1 text-neutral-600"
                            >
                                <Download className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Exporter
                                </span>
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 text-neutral-600"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    <span className="hidden sm:inline">
                                        Colonnes
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-[180px]"
                            >
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value
                                                    )
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-6 pt-4">
                <div className="flex flex-col gap-4">
                    {validFilterableColumns.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {validFilterableColumns.map((filter) => (
                                <Select
                                    key={filter.id}
                                    value={activeFilters[filter.id] || "all"}
                                    onValueChange={(value) =>
                                        handleColumnFilterChange(
                                            filter.id,
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger className="text-sm h-9">
                                        <SelectValue
                                            placeholder={`Filtrer par ${filter.title}`}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Tous
                                        </SelectItem>
                                        {filter.options.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ))}
                        </div>
                    )}

                    {Object.keys(activeFilters).length > 0 && (
                        <div className="flex flex-wrap gap-2 my-2">
                            {Object.entries(activeFilters).map(
                                ([columnId, value]) => (
                                    <Badge
                                        key={columnId}
                                        variant="secondary"
                                        className="flex items-center gap-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-1"
                                    >
                                        <span className="font-medium">
                                            {getFilterTitle(columnId)}:
                                        </span>
                                        <span>
                                            {getFilterValueLabel(
                                                columnId,
                                                value
                                            )}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-1 hover:bg-blue-200"
                                            onClick={() =>
                                                removeFilter(columnId)
                                            }
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                )
                            )}
                            {Object.keys(activeFilters).length > 1 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs text-neutral-500 hover:text-neutral-700"
                                    onClick={() => {
                                        Object.keys(activeFilters).forEach(
                                            (columnId) => {
                                                table
                                                    .getColumn(columnId)
                                                    ?.setFilterValue(undefined);
                                            }
                                        );
                                    }}
                                >
                                    Effacer tous les filtres
                                </Button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher..."
                                value={globalFilter}
                                onChange={(e) =>
                                    handleFilterChange(e.target.value)
                                }
                                className="pl-10 h-9 md:w-[300px] lg:w-[400px] bg-white"
                            />
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <span>
                                {table.getFilteredRowModel().rows.length}
                            </span>
                            <span className="px-1">sur</span>
                            <span>{data.length}</span>
                            <span className="hidden md:inline px-1">
                                résultats
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border mt-4 overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="bg-neutral-50 hover:bg-neutral-50"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="font-semibold text-neutral-700"
                                            style={{ width: header.getSize() }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    className={`flex items-center gap-1 ${
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : ""
                                                    }`}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {activeFilters[
                                                        header.column.id
                                                    ] && (
                                                        <Filter className="ml-1 h-3 w-3 text-blue-600" />
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronDown className="ml-1 h-4 w-4" />
                                                        ),
                                                        desc: (
                                                            <ChevronDown className="ml-1 h-4 w-4 rotate-180" />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="bg-white"
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center text-neutral-500">
                                            <Filter className="h-8 w-8 mb-2 text-neutral-300" />
                                            <p>Aucune donnée trouvée</p>
                                            <p className="text-sm text-neutral-400 mt-1">
                                                Essayez de modifier vos filtres
                                                ou votre recherche
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <span>Page</span>
                        <span className="font-medium px-1">
                            {table.getState().pagination.pageIndex + 1}
                        </span>
                        <span>sur</span>
                        <span className="font-medium px-1">
                            {table.getPageCount() || 1}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="h-8 w-8 p-0 flex items-center justify-center"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center justify-center text-sm text-muted-foreground">
                            {Array.from(
                                {
                                    length: Math.min(
                                        5,
                                        Math.max(1, table.getPageCount())
                                    ),
                                },
                                (_, i) => {
                                    const pageIndex =
                                        i +
                                        Math.max(
                                            0,
                                            Math.min(
                                                table.getPageCount() - 5,
                                                table.getState().pagination
                                                    .pageIndex - 2
                                            )
                                        );
                                    return (
                                        <Button
                                            key={pageIndex}
                                            variant={
                                                pageIndex ===
                                                table.getState().pagination
                                                    .pageIndex
                                                    ? "default"
                                                    : "ghost"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                table.setPageIndex(pageIndex)
                                            }
                                            className="h-8 w-8 p-0"
                                        >
                                            {pageIndex + 1}
                                        </Button>
                                    );
                                }
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="h-8 w-8 p-0 flex items-center justify-center"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <Select
                        value={table.getState().pagination.pageSize.toString()}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={pageSize.toString()}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
