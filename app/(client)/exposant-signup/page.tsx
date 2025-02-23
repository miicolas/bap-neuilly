import FormExposantSignup from "./(_exposant-signup)/form-signup-exposant";
import HeaderExposantSignup from "./(_exposant-signup)/header-signup-exposant";
import SignupExposant from "./(_exposant-signup)/signup-exposant";
import { getSession } from "@/lib/session";


export default async function ExposantSignupPage() {

    const session = await getSession();

    console.log(session);
    

    return (

        <div className="min-h-screen mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">
            <HeaderExposantSignup />
            {session ?  <FormExposantSignup email={session.user.email}  id={session.user.id} /> : <SignupExposant />}
        </div>

    )
}
