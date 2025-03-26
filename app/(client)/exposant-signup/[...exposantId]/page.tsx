import { getSession } from "@/lib/session";
import { Exposant } from "@/models/exposant";
import {
    CheckCircle2,
    Clock,
    Mail,
    Building2,
    FileImage,
    Store,
    Info,
    ShieldCheck,
} from "lucide-react";
import { unauthorized, redirect } from "next/navigation";
import UploadImages from "./(_exposantId)/upload-images";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignOut from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ExposantWaitingValidationPageProps {
    params: Promise<{ exposantId: string }>;
}

export default async function ExposantWaitingValidationPage({
    params,
}: ExposantWaitingValidationPageProps) {
    const { exposantId } = await params;
    const session = await getSession();

    if (!session) {
        unauthorized();
    }

    const checkForm = await Exposant.getExposantByUserId(session?.user.id);

    if (!checkForm || checkForm.length === 0) {
        unauthorized();
    }

    if (checkForm[0]?.exposantId !== exposantId[0]) {
        unauthorized();
    }

    const exposant = checkForm[0];

    if (exposant.status === "refused") {
        redirect("/exposant-signup/refused");
    }

    const steps = [
        {
            icon: CheckCircle2,
            title: "Formulaire complété",
            description: "Votre demande d'inscription a été enregistrée",
            status: "accepted",
        },
        {
            icon: Clock,
            title: "En cours de validation",
            description: "Notre équipe examine votre candidature",
            status: exposant.status === "accepted" ? "accepted" : "pending",
        },
        {
            icon: Mail,
            title: "Confirmation",
            description: "Vous recevrez un email avec la suite des étapes",
            status: exposant.status === "accepted" ? "accepted" : "pending",
        },
    ];

    const statusInfo = {
        waiting: {
            bgColor: "bg-amber-50",
            borderColor: "border-amber-200",
            textColor: "text-amber-800",
            iconColor: "text-amber-600",
            title: "En attente de validation",
            description:
                "Votre dossier est en cours d'examen. Vous recevrez une notification par email dès qu'il sera approuvé.",
        },
        accepted: {
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
            textColor: "text-emerald-800",
            iconColor: "text-emerald-600",
            title: "Candidature acceptée",
            description:
                "Félicitations ! Votre candidature a été approuvée. Vous pouvez maintenant accéder à votre espace exposant.",
        },
    };

    const currentStatus =
        exposant.status === "pending" ? "waiting" : exposant.status;

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-50/50 to-violet-50/50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                            <Store className="h-7 w-7 text-violet-600" />
                            Espace Exposant
                        </h1>
                        <p className="text-muted-foreground">
                            Bienvenue {exposant.firstName} {exposant.lastName} •{" "}
                            <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200"
                            >
                                {exposant.exposantId}
                            </Badge>
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SignOut
                            redirectTo="/exposant-signup"
                            variant="outline"
                            className="gap-2 text-muted-foreground hover:text-foreground"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-blue-100 shadow-sm">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                    <CardTitle className="text-lg font-semibold">
                                        État de votre candidature
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Suivez l'avancement de votre demande
                                    d'inscription
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="relative">
                                    <div className="absolute left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-violet-200 via-blue-200 to-violet-50" />
                                    <div className="space-y-10">
                                        {steps.map((step) => {
                                            const Icon = step.icon;
                                            return (
                                                <div
                                                    key={step.title}
                                                    className="relative flex gap-6"
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-16 h-16 rounded-full flex items-center justify-center border-2 z-10",
                                                            step.status ===
                                                                "accepted" &&
                                                                "bg-emerald-50 border-emerald-400 shadow-sm",
                                                            step.status ===
                                                                "pending" &&
                                                                "bg-blue-50 border-blue-200"
                                                        )}
                                                    >
                                                        <Icon
                                                            className={cn(
                                                                "w-7 h-7",
                                                                step.status ===
                                                                    "accepted" &&
                                                                    "text-emerald-600",
                                                                step.status ===
                                                                    "pending" &&
                                                                    "text-blue-400"
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="flex-1 pt-4">
                                                        <h3
                                                            className={cn(
                                                                "font-medium flex items-center gap-2",
                                                                step.status ===
                                                                    "accepted"
                                                                    ? "text-emerald-700"
                                                                    : ""
                                                            )}
                                                        >
                                                            {step.title}
                                                            {step.status ===
                                                                "accepted" && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-emerald-100 text-emerald-700 border-emerald-200"
                                                                >
                                                                    Complété
                                                                </Badge>
                                                            )}
                                                            {step.status ===
                                                                "pending" && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-blue-100 text-blue-700 border-blue-200"
                                                                >
                                                                    En cours
                                                                </Badge>
                                                            )}
                                                            {step.status ===
                                                                "refused" && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-red-100 text-red-700 border-red-200"
                                                                >
                                                                    Refusé
                                                                </Badge>
                                                            )}
                                                            {step.status ===
                                                                "accepted" && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="bg-emerald-100 text-emerald-700 border-emerald-200"
                                                                >
                                                                    Accepté
                                                                </Badge>
                                                            )}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="pb-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <FileImage className="h-5 w-5 text-violet-600" />
                                Complétez votre profil
                            </h2>
                            <UploadImages userId={session?.user.id} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-blue-100 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-indigo-600" />
                                    Informations de l'entreprise
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-0">
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-muted-foreground">
                                            Société
                                        </dt>
                                        <dd className="font-medium">
                                            {exposant.companyName}
                                        </dd>
                                    </div>
                                    <Separator />
                                    <div>
                                        <dt className="text-muted-foreground">
                                            Catégorie
                                        </dt>
                                        <dd>
                                            {exposant.type
                                                .split(",")
                                                .map((type, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                        className="mr-1 mb-1"
                                                    >
                                                        {type.trim()}
                                                    </Badge>
                                                ))}
                                        </dd>
                                    </div>
                                    <Separator />
                                    <div>
                                        <dt className="text-muted-foreground">
                                            Contact
                                        </dt>
                                        <dd className="font-medium">
                                            {exposant.firstName}{" "}
                                            {exposant.lastName}
                                        </dd>
                                        <dd className="text-muted-foreground text-xs mt-1">
                                            {exposant.email}
                                        </dd>
                                    </div>
                                </dl>
                            </CardContent>
                            <CardFooter className="pt-4 pb-4">
                                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800 flex items-start gap-2 w-full">
                                    <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium">
                                            {statusInfo[currentStatus].title}
                                        </p>
                                        <p className="text-xs mt-1">
                                            {
                                                statusInfo[currentStatus]
                                                    .description
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                        <Card className="border-blue-100 shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                    Besoin d'aide ?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start gap-2"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Contacter le support
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2"
                                    >
                                        <Info className="h-4 w-4" />
                                        FAQ exposants
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="text-center text-sm text-muted-foreground pt-6">
                    © 2023 Salon des Créateurs • Tous droits réservés
                </div>
            </div>
        </div>
    );
}
