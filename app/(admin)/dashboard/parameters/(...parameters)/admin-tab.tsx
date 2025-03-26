import { Button } from "@/components/ui/button";
import { ListAdminAction } from "@/action/(admin)/list/action";
import { Admin } from "@/lib/type";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AdminForm from "./form-admin";
import { TableAdmin } from "./admin-table";

export default async function AdminTab() {
    const listAdminAction = await ListAdminAction();

    return (
        <div>
            <TableAdmin
                adminList={listAdminAction.content as unknown as Admin[]}
            />
            <Dialog>
                <DialogTitle className="sr-only">
                    Ajouter un administrateur
                </DialogTitle>
                <DialogTrigger asChild>
                    <Button>Ajouter un administrateur</Button>
                </DialogTrigger>
                <DialogContent>
                    <AdminForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}


