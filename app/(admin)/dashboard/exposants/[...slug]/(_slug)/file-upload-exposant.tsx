"use client";

import Image from "next/image";
import { toast } from "sonner";
import { Exposant } from "@/lib/type";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import {
    ImageIcon,
    AlertCircle,
    CheckCircle,
    Image as ImageIcon2,
    ImagePlus,
    Paintbrush,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getMinioUrl } from "@/lib/utils";

export default function FileUploadExposant({
    exposant,
}: {
    exposant: Exposant;
}) {

    const FilesUpload = [
        {
            fileName: "logo",
            label: "Logo de la marque",
            description:
                "Logo principal représentant la marque (format carré recommandé)",
            icon: <Paintbrush className="h-5 w-5 text-amber-600" />,
            isLogo: true,
        },
        {
            fileName: "picture",
            label: "Photo principale",
            description: "Photo représentative des créations",
            icon: <ImageIcon className="h-5 w-5 text-blue-600" />,
            isLogo: false,
        },
        {
            fileName: "picture2",
            label: "Photo secondaire",
            description: "Autre perspective des créations",
            icon: <ImageIcon2 className="h-5 w-5 text-violet-600" />,
            isLogo: false,
        },
        {
            fileName: "picture3",
            label: "Photo d'ambiance",
            description: "Photo montrant les produits dans leur contexte",
            icon: <ImageIcon2 className="h-5 w-5 text-emerald-600" />,
            isLogo: false,
        },
        {
            fileName: "picture4",
            label: "Photo de produits",
            description: "Photo détaillée des produits",
            icon: <ImageIcon2 className="h-5 w-5 text-rose-600" />,
            isLogo: false,
        },
    ];

    const images: Record<string, string | null> = {
        logo: exposant.logoUrl || exposant.images?.[0]?.picture || null,
        picture: exposant.pictureUrl || exposant.images?.[1]?.picture || null,
        picture2: exposant.picture2Url || exposant.images?.[2]?.picture || null,
        picture3: exposant.picture3Url || exposant.images?.[3]?.picture || null,
        picture4: exposant.picture4Url || exposant.images?.[4]?.picture || null,
    };

    const hasImage = (key: string): boolean => {
        return images[key] !== null && images[key] !== undefined && images[key] !== "";
    };

    const hasAllImages = Object.values(images).every((img) => img !== null);
    const hasNoImages = Object.values(images).every((img) => img === null);

    return (
        <Card className="shadow-sm overflow-hidden">
            <CardHeader className="bg-violet-50 pb-3">
                <div className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-violet-600" />
                    <CardTitle className="text-lg">Galerie d'images</CardTitle>
                </div>
                <CardDescription>
                    Gérez les images qui représentent l'exposant sur la
                    plateforme
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-5">
                {hasAllImages ? (
                    <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <AlertDescription className="text-emerald-800">
                            Toutes les images sont bien téléchargées
                        </AlertDescription>
                    </Alert>
                ) : hasNoImages ? (
                    <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription>
                            Aucune image n'a encore été téléchargée par cet
                            exposant
                        </AlertDescription>
                    </Alert>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                    {FilesUpload.map((file) => (
                        <Card
                            key={file.fileName}
                            className="overflow-hidden border shadow-sm h-full"
                        >
                            <CardHeader className="p-3 pb-2 bg-neutral-50">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    {file.icon}
                                    {file.label}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-2">
                                {hasImage(file.fileName) ? (
                                    <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-neutral-50">
                                        <Image
                                            src={getMinioUrl(images[file.fileName] as string) || ""}
                                            alt={`${file.label} de ${exposant.companyName}`}
                                            width={300}
                                            height={300}
                                            className={`object-cover w-full h-full ${
                                                file.isLogo
                                                    ? "object-contain p-2"
                                                    : ""
                                            }`}
                                            
                                        />
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center aspect-square w-full rounded-md border border-dashed bg-neutral-50 p-4">
                                        <ImagePlus className="h-8 w-8 text-neutral-400 mb-2" />
                                        <p className="text-xs text-center text-muted-foreground">
                                            Aucune image téléchargée
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="p-3 pt-0">
                                <Button
                                    variant="outline"
                                    className="w-full text-xs h-8"
                                    size="sm"
                                    onClick={() => {
                                        toast.error(
                                            "La fonctionnalité de téléchargement par l'administrateur sera implémentée prochainement"
                                        );
                                    }}
                                >
                                    {hasImage(file.fileName) ? "Remplacer l'image" : "Ajouter une image"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
