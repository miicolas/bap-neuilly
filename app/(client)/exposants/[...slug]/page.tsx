import { GetExposantAction } from "@/action/(exposant)/get-exposant/action";
import { notFound } from "next/navigation";
import { Exposant } from "@/lib/type";
import { ExposantHeader } from "./(_slug)/exposant-header";
import { ImageGallery } from "./(_slug)/image-gallery";
import { ExposantContent } from "./(_slug)/exposant-content";
import { getMinioUrl } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { GetExposantSelectAction } from "@/action/(admin)/(exposant)/get-select/action";
import { ListExposants } from "@/components/list-exposants";

interface ExposantPageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function ExposantPage({ params }: ExposantPageProps) {
    const { slug } = await params;

    if (!slug?.[0]) {
        return notFound();
    }

    const exposantData = await GetExposantAction({ slug: slug[0] });
    const exposantSelect = await GetExposantSelectAction();

    if (exposantData.status === "error") {
        return notFound();
    }

    if (exposantSelect.status === "error") {
        return notFound();
    }

    const exposant = exposantData.content as Exposant;
    const types = exposant.type.split(",");

    const images = [
        {
            src: getMinioUrl(exposant.images?.[0]?.picture || null),
            alt: "Image principale",
        },
        {
            src: getMinioUrl(exposant.images?.[1]?.picture || null),
            alt: "Miniature 1",
        },
        {
            src: getMinioUrl(exposant.images?.[2]?.picture || null),
            alt: "Miniature 2",
        },
        {
            src: getMinioUrl(exposant.images?.[3]?.picture || null),
            alt: "Miniature 3",
        },
    ].filter((img) => img.src !== null);

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Bouton retour */}
                <div className="mb-6">
                    <Link href="/exposants" className="flex items-center gap-2 text-white hover:underline">
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span>Retour</span>
                    </Link>
                </div>

                {/* En-tête de l'exposant */}
                <ExposantHeader
                    logo={getMinioUrl(exposant.images?.[0]?.picture || null)}
                    companyName={exposant.companyName}
                    types={types}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Galerie d'images */}
                    <ImageGallery images={images} priority />

                    {/* Contenu et onglets */}
                    <ExposantContent
                        history={exposant.history}
                        products={exposant.products}
                    />
                </div>

                {/* Liste des autres exposants */}
                <div className="mt-12">
                    <ListExposants
                        exposants={exposantSelect.content as Exposant[]}
                    />
                </div>
            </div>
        </div>
    );
}
