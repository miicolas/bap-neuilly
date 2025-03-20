import { getSession } from "@/lib/session";
import { Exposant } from "@/models/exposant";
import { XCircle, Mail, ArrowLeft } from "lucide-react";
import { unauthorized } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignOut from "@/components/sign-out";

export default async function ExposantRefusedPage() {
    const session = await getSession();

    if (!session) {
        unauthorized();
    }

    const checkForm = await Exposant.getExposantByUserId(session?.user.id);

    if (!checkForm || checkForm.length === 0 || checkForm[0].status !== "refused") {
        unauthorized();
    }

    const exposant = checkForm[0];

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-red-50/50 to-rose-50/50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-1">
                            <XCircle className="h-7 w-7 text-red-600" />
                            Candidature refusée
                        </h1>
                        <p className="text-muted-foreground">
                            {exposant.firstName} {exposant.lastName}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <SignOut redirectTo="/exposant-signup" variant="outline" className="gap-2 text-muted-foreground hover:text-foreground" />
                    </div>
                </div>

                <Card className="border-red-100 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-red-700">
                            Nous regrettons de vous informer que votre candidature n'a pas été retenue
                        </CardTitle>
                        <CardDescription>
                            Nous vous remercions de l'intérêt que vous portez au Salon des Créateurs
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-800">
                            <p>
                                Notre équipe a examiné attentivement votre dossier et a pris la décision de ne pas retenir votre candidature pour cette édition.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium">Que faire maintenant ?</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <Mail className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span>Vous recevrez un email détaillant les raisons de ce refus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <ArrowLeft className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <span>Vous pouvez soumettre une nouvelle candidature pour la prochaine édition</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                            <Button asChild variant="outline" className="w-full sm:w-auto">
                                <Link href="/exposant-signup">
                                    Nouvelle candidature
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full sm:w-auto">
                                <Link href="/contact">
                                    Contacter le support
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-muted-foreground pt-6">
                    © 2023 Salon des Créateurs • Tous droits réservés
                </div>
            </div>
        </div>
    );
} 