"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteAdminAction } from "@/action/(admin)/delete/action";
import { toast } from "sonner";
import { Admin } from "@/lib/type";
import { Button } from "@/components/ui/button";

export function TableAdmin({ adminList }: { adminList: Admin[] }) {
    const handleDelete = async (adminEmail: string) => {
        const response = await DeleteAdminAction({ adminEmail: adminEmail });
        if (response.status === "success") {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };
    return (
        <Table>
            <TableCaption>Liste des administrateurs.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead>Nom</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {adminList.map((admin) => (
                    <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                            {admin.email}
                        </TableCell>
                        <TableCell>{admin.name}</TableCell>
                        <TableCell className="text-right">
                            <Button onClick={() => handleDelete(admin.email)}>
                                Supprimer
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
