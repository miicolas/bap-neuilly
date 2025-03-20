import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CardLp({ type }: { type: "exposant" | "visiteur" }) {
    const typeCard = {
        exposant: {
            title: "EXPOSANTS",
            description:
                "Exposez votre savoir-faire et partagez votre passion au Salon des Créateurs et Objets d'Art de Neuilly-sur-Seine.",
            image: "/images/exposant.jpg",
        },
        visiteur: {
            title: "VISITEURS",
            description:
                "Découvrez les créations des artisans et objets d'art au Salon des Créateurs et Objets d'Art de Neuilly-sur-Seine.",
            image: "/images/visiteur.jpg",
        },
    };

    return (
        <Link
            href={type === "exposant" ? "/exposant" : "/visiteur"}
            className="group"
        >
            <Card className="relative w-full max-w-lg overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                        <Image
                            src={typeCard[type].image}
                            alt="Artisan travaillant dans son atelier"
                            fill
                            sizes="(max-width: 768px) 80vw, (max-width: 1000px) 35vw, 25vw"
                            className="object-cover brightness-[0.85] transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                    </div>
                    <div className="flex flex-col gap-4 p-8 text-neutral-800">
                        <div className="flex items-center gap-2">
                            <h2 className="text-4xl font-bold group-hover:text-indigo-600 transition-colors duration-300">
                                {typeCard[type].title}
                            </h2>
                            <ArrowRight className="w-10 h-10 hidden group-hover:block transition-transform duration-300 group-hover:translate-x-1 text-indigo-600" />
                        </div>
                        <p className="text-lg leading-relaxed">
                            {typeCard[type].description}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
