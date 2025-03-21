import { GetExposantAction } from "@/action/(exposant)/get-exposant/action";
import FormExposant from "./(_slug)/form-exposant";
import AsideExposant from "./(_slug)/aside-exposant";
import FileUploadExposant from "./(_slug)/file-upload-exposant";
import { notFound } from "next/navigation";
import { Exposant } from "@/lib/type";
import { ChevronLeft, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function DashboardExposantDetail({ params }: PageProps) {
    let data;
    try {
        const { slug } = await params;
        if (!slug || slug.length < 1) {
            notFound();
        }

        const exposantSlug = slug[0];

        const exposantData = await GetExposantAction({ slug: exposantSlug });
        if (exposantData.status === "error" || !exposantData.content) {
            notFound();
        }

        data = exposantData.content as Exposant;
    } catch (error) {
        console.error(error);
        notFound();
    }

    const exposant = data as Exposant;

    console.log(exposant, "exposant")

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
                <div>
                    <Link
                        href="/dashboard/exposants"
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-3 transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Retour aux exposants
                    </Link>
                    <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        <Store className="h-6 w-6 text-violet-600" />
                        Détails de l'exposant: {exposant.companyName}
                    </h1>
                </div>
                <div className="flex-shrink-0">
                    <Button
                        asChild
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                    >
                        <Link
                            href={`/exposant/${exposant.slug}`}
                            target="_blank"
                        >
                            Voir la page publique
                        </Link>
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="mb-4 bg-muted/50">
                    <TabsTrigger value="details">Informations</TabsTrigger>
                    <TabsTrigger value="images">Images & Logo</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3">
                            <FormExposant exposant={exposant} />
                        </div>

                        <div className="lg:col-span-1">
                            <AsideExposant
                                id={exposant.id!}
                                exposant={exposant}
                                status={exposant.status}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="images" className="mt-0">
                    <div className="grid grid-cols-1 gap-6 max-w-4xl">
                        <FileUploadExposant exposant={exposant} />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
