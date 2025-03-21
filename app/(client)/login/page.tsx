"use client"

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
import { Loader2, LogIn, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        newUserCallbackURL: "/api/auth/check-admin"
      });
    } catch (error) {
      console.error("Erreur de connexion avec Google:", error);
      toast.error("Erreur lors de la connexion avec Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-primary/10 p-3 rounded-full">
            <LogIn className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Salon des créateurs</h1>
          <p className="text-muted-foreground">
            Connectez-vous pour accéder à votre espace administrateur
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous pour accéder à votre espace administrateur
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  Autres options
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link
                href="/exposant-signup"
                className="flex items-center font-medium text-primary hover:underline"
              >
                S'inscrire en tant qu'exposant
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Link
                href="/visitor-signup"
                className="flex items-center font-medium text-primary hover:underline"
              >
                S'inscrire en tant que visiteur
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}