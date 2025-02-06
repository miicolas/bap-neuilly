import VisitorSignupForm from "./(_visitor-signup)/form-signup";

export default function VisitorSignup() {

    return (
        <div className="min-h-screen max-w-md mx-auto bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 gap-8">

            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mt-4">
                    Vous êtes un visiteur ?
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400 text-center text-balance">
                    Inscrivez-vous pour particier à la prochaine édition du
                    <span className="font-bold"> Salon des créateurs d'objects et artisans de Neuilly</span>
                </p>
            </div>
            <VisitorSignupForm />
        </div>
    )

}