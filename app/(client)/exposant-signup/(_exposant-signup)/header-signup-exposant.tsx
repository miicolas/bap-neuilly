import { Palette, Brush, Calendar, MapPin } from "lucide-react";
import ExposantSignupHeaderInfo from "./header-info";
export default function ExposantSignupHeader() {
    const headerInfo = [
        {
            title: "Artisanat d'art",
            icon: <Palette className="h-8 w-8 text-yellow-500 mb-2" />,
        },
        {
            title: "Créations originales",
            icon: <Brush className="h-8 w-8 text-yellow-500 mb-2" />,
        },
        {
            title: "27-29 Octobre 2024",
            icon: <Calendar className="h-8 w-8 text-yellow-500 mb-2" />,
        },
        {
            title: "Neuilly-sur-Seine",
            icon: <MapPin className="h-8 w-8 text-yellow-500 mb-2" />,
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-6">
                Inscription exposant
            </h1>

            <p className="text-lg text-center text-muted-foreground mb-8 max-w-2xl">
                Rejoignez la communauté d'artisans et de créateurs pour la
                prochaine édition du
                <span className="font-semibold text-foreground">
                    {" "}
                    Salon des créateurs d&apos;objets et artisans de Neuilly
                </span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
                {headerInfo.map((info) => (
                    <ExposantSignupHeaderInfo
                        key={info.title}
                        title={info.title}
                        icon={info.icon}
                    />
                ))}
            </div>
        </div>
    );
}
