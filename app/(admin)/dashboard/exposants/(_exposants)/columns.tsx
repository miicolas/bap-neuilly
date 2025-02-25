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
import { ExposantAwaiting } from "@/lib/type"
import { DeleteExposantAction } from "@/action/(admin)/(exposant)/delete/action"
import Link from "next/link"

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
        accessorKey: "lastName",
        header: "Nom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const exposant = row.original

            const handleDeleteVisitor = async () => {

                if (exposant.id) {
                    const deleteVisitor = await DeleteExposantAction({ id: exposant.id })
                    if (deleteVisitor.status === "success") {
                        toast.success(deleteVisitor.message)
                    } else {
                        toast.error(deleteVisitor.message)
                    }
                } else {
                    toast.error("Exposant non trouvé")
                }
            }
            return (
                <DropdownMenu >
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
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/exposants/${exposant.companyName}`}>
                                Voir l'exposant
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={handleDeleteVisitor}
                        >
                            <Button variant="danger" className="w-full">
                                Supprimer l'exposant
                            </Button>
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },

]
