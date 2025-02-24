'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {

    const router = useRouter();

    const signOut = async () => {
        await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/exposant-signup"); 
              },
            },
        });
    }

    return (
        <Button onClick={() => signOut()}>Déconnexion</Button>
    )
}