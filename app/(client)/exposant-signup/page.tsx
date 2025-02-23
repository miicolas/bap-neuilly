import FormExposantSignup from "./(_exposant-signup)/form-signup-exposant";
import HeaderExposantSignup from "./(_exposant-signup)/header-signup-exposant";

export default function ExposantSignupPage() {

    return (

        <div className="min-h-screen  mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">
            <HeaderExposantSignup />
            <FormExposantSignup />
        </div>

    )
}
