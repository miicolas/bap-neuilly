import Image from "next/image";

export default function PictureSalon() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-fit items-start py-16 mx-auto">
            <div className="flex flex-col gap-4 w-fit max-w-2xl p-8">
                <h1 className="text-6xl font-bold text-neutral-200">
                    Le Salon en photos
                </h1>
                <p className="text-lg text-neutral-200 mt-4 leading-relaxed flex flex-col gap-4">
                    <span>
                        Le Salon des Créateurs et Objets d'Art de
                        Neuilly-sur-Seine est un événement incontournable dédié
                        à l'artisanat d'art et à la création contemporaine.
                    </span>
                    <br />
                    <span>
                        Chaque année, il réunit une sélection d'artisans,
                        artistes et designers venus présenter leurs œuvres
                        uniques : bijoux, céramiques, sculptures, textiles et
                        bien plus encore. Ce salon offre aux visiteurs
                        l'opportunité de découvrir des pièces originales,
                        d'échanger avec les créateurs et d'acquérir des objets
                        d'exception.
                    </span>
                    <br />
                    <span>
                        Entre savoir-faire traditionnel et innovations
                        artistiques, cet événement met en lumière la richesse de
                        la création française dans une ambiance élégante et
                        conviviale.
                    </span>
                </p>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 p-8">
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/salon1.jpg"
                        alt="Photo du salon des créateurs - Vue 1"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/salon2.jpg"
                        alt="Photo du salon des créateurs - Vue 2"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/salon3.jpg"
                        alt="Photo du salon des créateurs - Vue 3"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                    />
                </div>
                <div className="relative aspect-square w-full">
                    <Image
                        src="/images/salon4.jpg"
                        alt="Photo du salon des créateurs - Vue 4"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
