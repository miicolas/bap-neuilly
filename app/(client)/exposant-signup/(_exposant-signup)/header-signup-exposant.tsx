import { Palette, Brush, Calendar, MapPin } from "lucide-react";

export default function ExposantSignupHeader() {
    return (
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
        
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6">
                Inscription exposant
            </h1>
            
            <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl">
                Rejoignez la communauté d'artisans et de créateurs pour la prochaine édition du
                <span className="font-semibold text-foreground"> Salon des créateurs d&apos;objets et artisans de Neuilly</span>
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm">
                    <Palette className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">Artisanat d'art</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm">
                    <Brush className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">Créations originales</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">27-29 Octobre 2024</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm">
                    <MapPin className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">Neuilly-sur-Seine</span>
                </div>
            </div>
        </div>
    )
}