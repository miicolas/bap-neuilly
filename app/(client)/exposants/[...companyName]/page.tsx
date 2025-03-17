import { GetExposantAction } from "@/action/(exposant)/get-exposant/action";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ExposantPageProps {
    params: Promise<{ companyName?: string[] }>;
}

export default async function ExposantPage({ params }: ExposantPageProps) {
    const resolvedParams = await params;

    if (!resolvedParams?.companyName || !resolvedParams.companyName.length) {
        return notFound();
    }

    const companyName = decodeURIComponent(
        resolvedParams.companyName.join("/")
    );
    const exposantData = await GetExposantAction({ companyName });

    if (exposantData.status === "error") {
        return notFound();
    }

    const exposant = exposantData.content as {
        companyName: string;
        history: string;
        products: string;
        type: string;
        logo: string | null;
        picture: string | null;
        picture2: string | null;
        picture3: string | null;
        picture4: string | null;
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="flex items-center gap-6 border-b pb-6">
                {exposant.logo && (
                    <Image
                        src={exposant.logo}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="rounded-lg shadow-lg"
                    />
                )}
                <h1 className="text-4xl font-bold text-gray-900">
                    {exposant.companyName}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                    <p className="text-lg text-gray-600">{exposant.history}</p>
                    <p className="mt-4">
                        <strong>Produits:</strong> {exposant.products}
                    </p>
                    <p className="mt-2">
                        <strong>Type:</strong> {exposant.type}
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mt-10 mb-4">Galerie</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {exposant.picture && (
                    <Image
                        src={exposant.picture}
                        alt="Image 1"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                    />
                )}
                {exposant.picture2 && (
                    <Image
                        src={exposant.picture2}
                        alt="Image 2"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                    />
                )}
                {exposant.picture3 && (
                    <Image
                        src={exposant.picture3}
                        alt="Image 3"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                    />
                )}
                {exposant.picture4 && (
                    <Image
                        src={exposant.picture4}
                        alt="Image 4"
                        width={300}
                        height={200}
                        className="rounded-lg shadow-md"
                    />
                )}
            </div>
        </div>
    );
}
