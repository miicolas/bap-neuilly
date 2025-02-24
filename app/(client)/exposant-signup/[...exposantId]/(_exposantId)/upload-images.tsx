import FileUpload from "@/components/file-upload";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageIcon } from "lucide-react";
import { Exposant } from "@/models/exposant";

export default async function UploadImages({userId}: {userId: string} ) {
    const FilesUpload = [
        {
            fileName: "logo",
            label: "Logo de votre marque",
            description:
                "Votre logo principal qui représente votre marque (format carré recommandé)",
        },
        {
            fileName: "picture",
            label: "Photo principale",
            description: "Une photo représentative de vos créations",
        },
        {
            fileName: "picture2",
            label: "Photo secondaire",
            description: "Une autre perspective de vos créations",
        },
        {
            fileName: "picture3",
            label: "Photo d'ambiance",
            description: "Une photo montrant vos produits dans leur contexte",
        },
        {
            fileName: "picture4",
            label: "Photo de vos produits",
            description: "Une photo de vos produits",
        },
    ];

    const imagesArray = await Exposant.getFilesByUserId(userId);
    const images = imagesArray[0] as Record<string, string | null>;
    
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ImageIcon className="h-6 w-6 text-primary" />
                    <CardTitle>Galerie de votre marque</CardTitle>
                </div>
                <CardDescription>
                    Téléchargez les images qui représenteront votre marque sur
                    notre plateforme
                </CardDescription>
            </CardHeader>
            <CardContent>
                {Object.values(images).every(image => image !== null) ? (
                    <div className="mt-6 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="alert">
                        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                        </svg>
                        <p className="text-lg font-semibold">Toutes les images sont bonnes</p>
                    </div>
                    
                ) : (
                    <Tabs defaultValue="logo" className="w-fit">
                        <ScrollArea className="w-full">
                            <TabsList className="w-fit justify-start">
                            {FilesUpload.filter(file => images[file.fileName] == null).map((file) => (
                                <TabsTrigger
                                    key={file.fileName}
                                    value={file.fileName}
                                    className="min-w-[120px]"
                                >
                                    {file.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </ScrollArea>

                    {FilesUpload.map((file) => (
                        <TabsContent
                            key={file.fileName}
                            value={file.fileName}
                            className="mt-6"
                        >
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {file.label}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {file.description}
                                    </p>
                                </div>
                                <FileUpload
                                    fileName={file.fileName}
                                    label={file.label}
                                    maxSize={5 * 1024 * 1024}
                                    acceptedTypes={[
                                        "image/jpeg",
                                        "image/png",
                                        "image/webp",
                                    ]}
                                    isLogo={file.fileName === "logo"}
                                    existingImage={images[file.fileName]}
                                    userId={userId}
                                />
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                )}

                
            </CardContent>
        </Card>
    );
}
