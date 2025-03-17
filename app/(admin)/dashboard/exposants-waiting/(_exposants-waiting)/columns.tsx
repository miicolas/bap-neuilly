"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ExposantAwaiting } from "@/lib/type";
import { DeleteExposantAction } from "@/action/(admin)/(exposant)/delete/action";
import { AcceptExposantAction } from "@/action/(admin)/(exposant)/accept/action";
import { RefuseExposantAction } from "@/action/(admin)/(exposant)/refuse/action";

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
            const exposant = row.original;

            const handleDeleteVisitor = async () => {
                if (exposant.id) {
                    const deleteVisitor = await DeleteExposantAction({
                        id: exposant.id,
                    });
                    if (deleteVisitor.status === "success") {
                        toast.success(deleteVisitor.message);
                    } else {
                        toast.error(deleteVisitor.message);
                    }
                } else {
                    toast.error("Visitor ID is undefined");
                }
            };

            const handleAcceptVisitor = async () => {
                if (exposant.id) {
                    const acceptVisitor = await AcceptExposantAction({
                        id: exposant.id,
                    });
                    if (acceptVisitor.status === "success") {
                        toast.success(acceptVisitor.message);
                    } else {
                        toast.error(acceptVisitor.message);
                    }
                } else {
                    toast.error("Visitor ID is undefined");
                }
            };

            const handleRefuseVisitor = async () => {
                if (exposant.id) {
                    const refuseVisitor = await RefuseExposantAction({
                        id: exposant.id,
                    });
                    if (refuseVisitor.status === "success") {
                        toast.success(refuseVisitor.message);
                    } else {
                        toast.error(refuseVisitor.message);
                    }
                } else {
                    toast.error("Visitor ID is undefined");
                }
            };

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
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    exposant.exposantId
                                )
                            }
                        >
                            Copie l'ID de l'exposant
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/exposants/${exposant.companyName}`}>
                                Voir la page
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleAcceptVisitor}>
                            Accepter l'exposant
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleRefuseVisitor}>
                            Refuser l'exposant
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteVisitor}>
                            <Button variant="danger" className="w-full">
                                Supprimer l'exposant
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
