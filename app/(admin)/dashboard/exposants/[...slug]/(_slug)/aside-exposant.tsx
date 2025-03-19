"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Shield,
    Info,
    Briefcase,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { Exposant as ExposantType } from "@/lib/type";
import { handleAccept, handleRefuse } from "@/lib/utils";
import { cn } from "@/lib/utils";

const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "refused":
            return "bg-red-100 text-red-800 border-red-200";
        case "pending":
            return "bg-amber-100 text-amber-800 border-amber-200";
        default:
            return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "accepted":
            return "Accepté";
        case "refused":
            return "Refusé";
        case "pending":
            return "En attente";
        default:
            return status;
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "accepted":
            return <CheckCircle className="h-5 w-5 text-emerald-600" />;
        case "refused":
            return <XCircle className="h-5 w-5 text-red-600" />;
        case "pending":
            return <AlertTriangle className="h-5 w-5 text-amber-600" />;
        default:
            return <Info className="h-5 w-5 text-neutral-600" />;
    }
};

export default function AsideExposant({
    id,
    exposant,
    status,
}: {
    id: string;
    exposant: ExposantType;
    status: string;
}) {
    const router = useRouter();

    const handleAcceptClick = async () => {
        await handleAccept(id, exposant);
        router.refresh();
    };

    const handleRefuseClick = async () => {
        await handleRefuse(id, exposant);
        router.refresh();
    };

    return (
        <div className="space-y-4">
            <Card className="shadow-sm overflow-hidden">
                <CardHeader
                    className={cn(
                        "pb-3",
                        status === "accepted"
                            ? "bg-emerald-50"
                            : status === "refused"
                            ? "bg-red-50"
                            : "bg-amber-50"
                    )}
                >
                    <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center gap-2">
                            {getStatusIcon(status)}
                            Statut
                        </div>
                        <Badge
                            variant="outline"
                            className={cn(
                                "px-2.5 py-0.5",
                                getStatusColor(status)
                            )}
                        >
                            {getStatusLabel(status)}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4" />
                                Type
                            </span>
                            <div className="flex flex-wrap gap-1 justify-end">
                                {exposant.type.split(",").map((type, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                    >
                                        {type.trim()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <Shield className="h-4 w-4" />
                                ID
                            </span>
                            <span className="font-mono text-xs bg-neutral-100 px-2 py-0.5 rounded">
                                {exposant.exposantId}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 flex-col gap-3">
                    <TooltipProvider>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={handleAcceptClick}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Accepter
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Approuver la demande de l'exposant</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={handleRefuseClick}
                                        variant="destructive"
                                        className="w-full transition-all"
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Refuser
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Rejeter la demande de l'exposant</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>

                    <p className="text-xs text-muted-foreground text-center mt-2">
                        {status === "pending"
                            ? "Veuillez examiner cette demande et prendre une décision."
                            : status === "accepted"
                            ? "Cet exposant a été accepté. Vous pouvez modifier cette décision."
                            : "Cet exposant a été refusé. Vous pouvez modifier cette décision."}
                    </p>
                </CardFooter>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="pb-3 bg-blue-50">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        Informations
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">
                                Nom complet
                            </dt>
                            <dd className="font-medium">
                                {exposant.firstName} {exposant.lastName}
                            </dd>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">
                                Entreprise
                            </dt>
                            <dd className="font-medium">
                                {exposant.companyName}
                            </dd>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd className="font-medium">{exposant.email}</dd>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex justify-between">
                            <dt className="text-muted-foreground">SIRET</dt>
                            <dd className="font-medium font-mono text-xs">
                                {exposant.siret}
                            </dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </div>
    );
}
