import { GetExposantAction } from "@/action/(exposant)/get-exposant/action";
import { notFound } from "next/navigation";
import { Exposant } from "@/lib/type";
import { ExposantHeader } from "./_slug/exposant-header";
import { ImageGallery } from "./_slug/image-gallery";
import { ExposantContent } from "./_slug/exposant-content";
import { getMinioUrl } from "./_slug/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
interface ExposantPageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function ExposantPage({ params }: ExposantPageProps) {
    const { slug } = await params;

    if (!slug?.[0]) {
        return notFound();
    }

    const exposantData = await GetExposantAction({ slug: slug[0] });

    if (exposantData.status === "error") {
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
        <div className="py-12">
            <div className="flex items-center gap-2 mb-4">
                <Link href="/exposants" className="flex items-center gap-2">
                    <ArrowLeftIcon className="w-6 h-6" />
                    <span>Retour</span>
                </Link>
            </div>
            <ExposantHeader
                logo={getMinioUrl(exposant.images?.[0]?.picture || null)}
                companyName={exposant.companyName}
                types={types}
            />

            <div className="max-w-7xl mx-auto py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ImageGallery images={images} priority />

                    <ExposantContent
                        history={exposant.history}
                        products={exposant.products}
                    />
                </div>
            </div>
        </div>
    );
}
