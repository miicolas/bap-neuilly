'use client'

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Store, ArrowRight, ArrowLeft } from "lucide-react";

export default function SignupExposant() {
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async () => {
        try {
            setIsLoading(true);
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/exposant-signup/"
            });
        } catch (error) {
            console.error("Erreur de connexion avec Google:", error);
            toast.error("Erreur lors de la connexion avec Google");
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-xl">Espace Exposant</CardTitle>
                        <CardDescription>
                            Créez votre compte exposant pour le salon
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                    <p>En vous inscrivant, vous pourrez :</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Présenter vos créations au salon</li>
                        <li>Gérer votre profil et vos produits</li>
                        <li>Communiquer avec les visiteurs</li>
                    </ul>
                </div>
                
                <Button
                    variant="outline"
                    className="w-full relative h-12"
                    onClick={signIn}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <svg 
                            className="w-5 h-5 mr-2" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                        </svg>
                    )}
                    <span className="text-sm font-medium">Continuer avec Google</span>
                </Button>
                
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Informations
                        </span>
                    </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground px-2">
                    <p>
                        Une fois connecté, vous pourrez remplir votre profil et soumettre votre candidature pour participer au salon.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <Link href="/" className="flex items-center text-sm text-primary hover:underline">
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Retour à l'accueil
                </Link>
                <Link href="/visitor-signup" className="flex items-center text-sm text-primary hover:underline">
                    Inscription visiteur
                    <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
            </CardFooter>
        </Card>
    )
}