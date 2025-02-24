import FormExposantSignup from "./(_exposant-signup)/form-signup-exposant";
import HeaderExposantSignup from "./(_exposant-signup)/header-signup-exposant";
import SignupExposant from "./(_exposant-signup)/signup-exposant";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Exposant } from "@/models/exposant";

export default async function ExposantSignupPage() {
    const session = await getSession();

    const checkForm = await Exposant.getExposantByUserId(
        session?.user.id ?? ""
    );

    if (checkForm.length > 0) {
        redirect(`/exposant-signup/${checkForm[0].exposantId}`);
    }

    return (
        <div className="min-h-screen mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">
            <HeaderExposantSignup />
            {session ? (
                <FormExposantSignup
                    email={session.user.email}
                    id={session.user.id}
                />
            ) : (
                <SignupExposant />
            )}
        </div>
    );
}
