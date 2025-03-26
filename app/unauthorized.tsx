import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="space-y-2">
                    <div className="flex justify-center">
                        <ShieldAlert className="h-24 w-24 text-destructive" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Accès non autorisé
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Désolé, vous n'avez pas les autorisations nécessaires pour accéder à cette page.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button asChild variant="default" size="lg">
                        <Link href="/login" className="flex items-center gap-2">
                            Se connecter
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg">
                        <Link href="/" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Retour à l'accueil
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}