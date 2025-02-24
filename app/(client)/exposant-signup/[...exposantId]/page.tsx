import { getSession } from "@/lib/session";
import { Exposant } from "@/models/exposant";
import {
    CheckCircle2,
    Clock,
    Mail,
} from "lucide-react";
import { unauthorized } from "next/navigation";
import UploadImages from "./(_exposantId)/upload-images";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignOut from "@/components/sign-out";

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

    const status = checkForm[0]?.status;

    if (status === "accepted") {
        unauthorized();
    }

    if (checkForm[0]?.exposantId !== exposantId[0]) {
        unauthorized();
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
            status: "pending",
        },
        {
            icon: Mail,
            title: "Confirmation",
            description: "Vous recevrez un email avec la suite des étapes",
            status: "pending",
        },
    ];

    return (
        <div className="min-h-screen w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Complétez votre profil
                    </CardTitle>
                    <CardDescription>
                        En attendant la validation de votre demande, vous pouvez
                        télécharger vos images.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
                        <div className="space-y-8">
                            {steps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.title}
                                        className="relative flex gap-6"
                                    >
                                        <div
                                            className={cn(
                                                "w-16 h-16 rounded-full flex items-center justify-center bg-background border-2",
                                                step.status === "accepted" &&
                                                    "border-primary",
                                                step.status === "pending" &&
                                                    "border-primary/50"
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "w-8 h-8",
                                                    step.status ===
                                                        "accepted" &&
                                                        "text-primary",
                                                    step.status === "pending" &&
                                                        "text-primary/50 animate-pulse"
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1 pt-4">
                                            <h3 className="font-semibold">
                                                {step.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
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

            {checkForm[0] && checkForm[0].status === "pending" && (
                <div className="pt-8">
                    <UploadImages userId={session?.user.id} />
                </div>
            )}
            <SignOut />
        </div>
    );
}
