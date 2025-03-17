"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteVisitorAction } from "@/action/(admin)/(visitor)/delete/action"
import { Visitor } from "@/lib/type"

export const columns: ColumnDef<Visitor>[] = [
    {
        accessorKey: "ticketNumber",
        header: "ticketNumber",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "person",
        header: "Person",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const visitor = row.original

            const handleDeleteVisitor = async () => {
                
                if (visitor.id) {
                    const deleteVisitor = await DeleteVisitorAction({ id: visitor.id })
                    if (deleteVisitor.status === "success") {
                        toast.success(deleteVisitor.message)
                    } else {
                        toast.error(deleteVisitor.message)
                    }
                } else {
                    toast.error("Visitor ID is undefined")
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(visitor.ticketNumber)}
                        >
                            Copie le numéro de ticket
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDeleteVisitor}
                        >
                            Supprimer le visiteur
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
