import VisitorSignupForm from "./(_visitor-signup)/form-signup-visitor"
import VisitorSignupHeader from "./(_visitor-signup)/header-signup-visitor"

export default function VisitorSignup() {

    return (
        <div className="min-h-screen max-w-md mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">
            <VisitorSignupHeader />
            <VisitorSignupForm />
        </div>
    )

}