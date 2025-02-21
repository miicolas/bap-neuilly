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
import { ExposantAwaiting } from "@/lib/type"

export const columns: ColumnDef<ExposantAwaiting>[] = [
    {
        accessorKey: "exposantId",
        header: "exposantId",
    },
    {
        accessorKey: "companyName",
        header: "Nom de la société",
    },
    {
        accessorKey: "status",
        header: "Statut",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const exposant = row.original

            const handleDeleteVisitor = async () => {
                
                if (exposant.id) {
                    const deleteVisitor = await DeleteVisitorAction({ id: exposant.id })
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
                            onClick={() => navigator.clipboard.writeText(exposant.exposantId)}
                        >
                            Copie l'ID de l'exposant
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDeleteVisitor}
                        >
                            Supprimer l'exposant
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
