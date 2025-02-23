'use client';
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ExposantWaitingValidationPage() {

    const params = useParams();
    const exposantId = params.exposantId;

    const { 
        data: session, 
    } = authClient.useSession() 

    return (
        <div className="min-h-screen  mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">
            <h1>Validation en cours</h1>
            <p>Merci de patienter, votre inscription est en cours de validation</p>
            {exposantId}

            {session ? <p>Session : {session.user.email}</p> : null}
        </div>
    )
}