import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import { Exposant } from "@/lib/type";
import { Suspense } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HtmlConvertorMdx from "@/components/ui/html-convertor-mdx";
import { limiteText } from "@/lib/utils";
export default async function ExposantsPage() {
    const data = await ListExposantsAction();
    const exposants = data.content as Exposant[];

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* En-tête */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Nos exposants
                    </h1>
                    <p className="text-lg text-neutral-200">
                        Découvrez les exposants qui seront présent au Salon des
                        créateurs d'objets et artisans de Neuilly
                    </p>
                </div>

                {/* Barre de recherche */}
                <div className="mb-8">
                    <div className="relative w-full max-w-md">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un exposant..."
                            className="w-full py-3 pl-10 pr-4 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                    </div>
                </div>

                {/* Liste des exposants */}
                <Suspense
                    fallback={
                        <div className="text-white">Chargement en cours...</div>
                    }
                >
                    <div className="space-y-4 gap-2 flex flex-col">
                        {exposants.map((exposant) => (
                            <ExposantCard
                                key={exposant.id}
                                exposant={exposant}
                            />
                        ))}
                    </div>
                </Suspense>
            </div>
        </div>
    );
}

function ExposantCard({ exposant }: { exposant: Exposant }) {
    const { companyName, type, history, logoUrl, slug } = exposant;
    const types = type.split(",");
    const logoUrlMinio = logoUrl
        ? `https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly/${logoUrl}`
        : null;

    return (
        <Link href={`/exposants/${slug}`}>
            <div className="bg-white rounded-lg p-6 transition-all hover:shadow-lg">
                <div className="flex items-start gap-6">
                    {/* Logo */}
                    <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden">
                        {logoUrlMinio ? (
                            <Image
                                src={logoUrlMinio}
                                alt={companyName}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 96px, 96px"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">Logo</span>
                            </div>
                        )}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {companyName}
                        </h2>

                        {/* Types */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {types.map((type, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-[#474F9E] text-white rounded-full"
                                >
                                    {type.trim()}
                                </span>
                            ))}
                        </div>

                        <HtmlConvertorMdx className="text-neutral-500">
                            {limiteText(String(history), 100)}
                        </HtmlConvertorMdx>
                    </div>
                </div>
            </div>
        </Link>
    );
}
