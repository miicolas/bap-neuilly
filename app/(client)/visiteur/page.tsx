import Image from "next/image";
import Link from "next/link";
import { ListExposants } from "@/components/list-exposants";
import { Exposant as ExposantType } from "@/lib/type";
import { GetExposantSelectAction } from "@/action/(admin)/(exposant)/get-select/action";
import { notFound } from "next/navigation";
import DateLocation from "@/components/date-location";
import { Button } from "@/components/ui/button";


export default async function ExposantPage() {
    const exposants = await GetExposantSelectAction();
    if (exposants.status === "error") {
        return notFound();
    }
    const exposantsList: ExposantType[] = exposants.content as ExposantType[];

    return (
        <div className="min-h-screen">
            <div
                className="relative h-[30rem] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/exposant-page.png')" }}
            >
                <div className="absolute top-15 left-45 bg-white w-36 h-36 flex items-center justify-center">
                    <span className="text-sm text-slate-200">logo</span>
                </div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
                    <h1 className="text-6xl font-bold text-center mb-12">
                        Salon de créateurs Neuilly
                    </h1>
                    <p className="text-4xl font-bold text-center mb-8">
                        Vous souhaitez découvrir les projets des Neuilléens ?
                    </p>
                    <p className="max-w-2xl text-center text-sm opacity-80 mt-10">
                        Le salon des créateurs et artisants de Neuilly-sur-Seine
                        est un événement incontournable qui met en lumière le
                        savoir-faire et la créativité des artisants locaux
                    </p>
                </div>
            </div>

            <div className="py-16">
                <DateLocation />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-fit items-start py-16 mx-auto">
                    <div className="flex flex-col gap-4 w-fit max-w-2xl p-8">
                        <h1 className="text-6xl font-bold text-neutral-200">
                            Qu’est ce que cela représente ?
                        </h1>
                        <p className="text-lg text-neutral-200 mt-4 leading-relaxed flex flex-col gap-4">
                            <span>
                                Visiter le Salon des Créateurs et Objets d'Art
                                de Neuilly-sur-Seine, c’est plonger dans un
                                univers où passion, savoir-faire et créativité
                                se rencontrent.
                            </span>
                            <br />
                            <span>
                                C’est l’occasion unique de découvrir des pièces
                                artisanales d’exception, d’échanger avec les
                                créateurs et de s’inspirer de leur talent.
                            </span>
                            <br />
                            <span>
                                Entre tradition et innovation, chaque stand est
                                une invitation à explorer des œuvres uniques et
                                à soutenir l’art sous toutes ses formes dans un
                                cadre raffiné et convivial.
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
            </div>

            <div className="py-16 h-[27.5rem] relative overflow-hidden">
                <div className="absolute inset-0 ">
                    <Image
                        src={"/images/exposant.jpg"}
                        alt="Background"
                        className="w-full h-full object-cover"
                        fill
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 mt-20">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h2 className="text-6xl font-bold text-white mb-12 uppercase tracking-wider">
                            Je vais visiter le salon
                        </h2>

                        <Link href="/visitor-signup">
                            <Button className="bg-amber-100 h-[50px] hover:bg-amber-200 text-slate-900 px-8 py-2 rounded-md text-sm font-medium transition-all border border-amber-200 shadow-sm">
                                Je m'inscris
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <ListExposants
                exposants={exposantsList}
                className="w-[85%] mx-auto"
            />
        </div>
    );
}
