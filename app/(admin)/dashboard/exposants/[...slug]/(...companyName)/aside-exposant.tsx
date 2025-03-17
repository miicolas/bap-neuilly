"use client";

import { AcceptExposantAction } from "@/action/(admin)/(exposant)/accept/action";
import { RefuseExposantAction } from "@/action/(admin)/(exposant)/refuse/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
export default function AsideExposant({
    id,
    status,
}: {
    id: string;
    status: string;
}) {    
    const router = useRouter();

    const handleAccept = () => {
        AcceptExposantAction({ id: id });
        router.refresh();
    };

    const handleRefuse = () => {
        RefuseExposantAction({ id: id });
        router.refresh();
    };

    return (
        <div className="flex flex-col items-start justify-start gap-4 bg-card p-4 rounded-md lg:h-full border border-neutral-200">
            <p className="text-sm font-medium">
                Le statut de l'exposant est actuellement :
            </p>
            <div>
                <Input
                    type="text"
                    placeholder={status}
                    disabled
                    className=" border-neutral-200 w-full"
                />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full">
                <Button variant="outline" className="w-full" onClick={handleAccept}>
                    <span className="text-sm font-medium">Accepter</span>
                </Button>
                <Button variant="destructive" className="w-full" onClick={handleRefuse}>
                    <span className="text-sm font-medium">Refuser</span>
                </Button>
            </div>
        </div>
    );
}
