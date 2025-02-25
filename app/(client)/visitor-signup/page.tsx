import VisitorSignupForm from "./(_visitor-signup)/form-signup-visitor";
import VisitorSignupHeader from "./(_visitor-signup)/header-signup-visitor";

export default function VisitorSignup() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-2xl m-auto bg-card p-4 rounded-lg dark:bg-gray-900 flex flex-col items-center justify-center gap-8">
                <VisitorSignupHeader />
                <VisitorSignupForm />
            </div>{" "}
        </div>
    );
}
