'use client'
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignupExposant() {

    const signIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/exposant-signup/"
        });
     
    }
    return (
        <div className="w-full max-w-md space-y-8">
            <Button
                onClick={signIn}
                className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white py-6"
            >
                <span className="text-lg">Continuer avec Google</span>
            </Button>
        </div>
    )
}