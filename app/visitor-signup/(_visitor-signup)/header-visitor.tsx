export default function VisitorSignupHeader() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mt-4">
                Inscription visiteur
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center text-balance">
                Inscrivez-vous pour particier à la prochaine édition du
                <span className="font-bold"> Salon des créateurs d'objects et artisans de Neuilly</span>
            </p>
        </div>
    )
}