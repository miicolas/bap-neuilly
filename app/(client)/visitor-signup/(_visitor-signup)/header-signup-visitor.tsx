import {
    Users,
    Gift,
    Calendar,
    MapPin,
    Ticket,
    Star,
    Clock,
} from "lucide-react";
import { GetEventDetailsAction } from "@/action/(visitor)/event-details/action";

export default async function VisitorSignupHeader() {

    const eventDetails = await GetEventDetailsAction() as { content: { dayEvent: string, dayEventEnd: string, localisation: string } };

    return (
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6">
                Inscription visiteur
            </h1>

            <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl">
                Réservez votre place pour découvrir les créations uniques lors
                de la prochaine édition du
                <span className="font-semibold text-foreground">
               
                    Salon des créateurs d&apos;objets et artisans de Neuilly
                </span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm hover:bg-muted/50 transition-colors">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">
                        +100 Exposants
                    </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm hover:bg-muted/50 transition-colors">
                    <Star className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">
                        Créations uniques
                    </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm hover:bg-muted/50 transition-colors">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">
                        {eventDetails.content.dayEvent ? eventDetails.content.dayEvent : "Date π définie"} - {eventDetails.content.dayEventEnd ? eventDetails.content.dayEventEnd : "Date non définie"}
                        
                    </span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card rounded-lg border shadow-sm hover:bg-muted/50 transition-colors">
                    <MapPin className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm font-medium text-center">
                        {eventDetails.content.localisation}
                    </span>
                </div>
            </div>

            <div className="w-full max-w-2xl p-4 bg-primary/5 rounded-lg border border-primary/10 text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <p className="font-semibold">
                        Entrée gratuite sur inscription
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">
                    Réservez dès maintenant pour garantir votre accès
                    prioritaire et recevoir les dernières informations sur
                    l'événement.
                </p>
            </div>

            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-card rounded-lg border shadow-sm flex items-center gap-3">
                    <Gift className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-semibold">
                            Cadeaux exclusifs
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Des surprises pour les premiers inscrits
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-card rounded-lg border shadow-sm flex items-center gap-3">
                    <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-semibold">
                            Accès prioritaire
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Évitez les files d'attente
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
