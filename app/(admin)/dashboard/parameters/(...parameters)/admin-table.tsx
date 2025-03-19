"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeleteAdminAction } from "@/action/(admin)/delete/action";
import { toast } from "sonner";
import { Admin } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Shield } from "lucide-react";

export function TableAdmin({ adminList }: { adminList: Admin[] }) {
    const handleDelete = async (adminEmail: string) => {
        try {
            const response = await DeleteAdminAction({ adminEmail: adminEmail });
            if (response.status === "success") {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue lors de la suppression");
        }
    };
    
    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="px-6 pb-0">
                <div className="flex items-center justify-between w-full">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        Administrateurs
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="px-6 pt-4">
                <div className="rounded-md border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-neutral-50">
                            <TableRow>
                                <TableHead className="font-semibold text-neutral-700 w-[50px]">#</TableHead>
                                <TableHead className="font-semibold text-neutral-700">Email</TableHead>
                                <TableHead className="font-semibold text-neutral-700">Nom</TableHead>
                                <TableHead className="font-semibold text-neutral-700 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {adminList.length > 0 ? (
                                adminList.map((admin, index) => (
                                    <TableRow key={admin.id} className="bg-white">
                                        <TableCell className="font-medium text-neutral-500 w-[50px]">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {admin.email}
                                        </TableCell>
                                        <TableCell>{admin.name || "Non défini"}</TableCell>
                                        <TableCell className="text-right">
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => handleDelete(admin.email)}
                                                className="h-8 px-3 flex items-center gap-1"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span>Supprimer</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        Aucun administrateur trouvé
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
