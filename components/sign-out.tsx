'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignOutProps {
    redirectTo: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    className?: string;
}

export default function SignOut({ 
    redirectTo,
    variant = "ghost",
    className
}: SignOutProps) {
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
            variant={variant}
            className={cn(
                "text-destructive hover:text-destructive/80 transition-colors duration-200",
                className
            )}
            onClick={() => signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
        </Button>
    )
}