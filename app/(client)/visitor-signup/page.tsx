import VisitorSignupForm from "./(_visitor-signup)/form-signup-visitor";
import VisitorSignupHeader from "./(_visitor-signup)/header-signup-visitor";

export default function VisitorSignup() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl m-auto py-16 px-4 flex flex-col items-center justify-center gap-8">
                <VisitorSignupHeader />
                <VisitorSignupForm />
            </div>{" "}
        </div>
    );
}
