'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOut({ redirectTo }: { redirectTo: string }) {
    const router = useRouter();

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push(redirectTo);
                },
            },
        });
    }

    return (
        <Button 
            variant="ghost" 
            className="w-full text-destructive hover:text-destructive/80 transition-colors duration-200 "
            onClick={() => signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
        </Button>
    )
}