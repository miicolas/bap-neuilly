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
import { ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Exposant } from "@/models/exposant";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function UploadImages({ userId }: { userId: string }) {
    const FilesUpload = [
        {
            fileName: "logo",
            label: "Logo de votre marque",
            description:
                "Votre logo principal qui représente votre marque (format carré recommandé)",
            icon: "🎨",
        },
        {
            fileName: "picture",
            label: "Photo principale",
            description: "Une photo représentative de vos créations",
            icon: "📸",
        },
        {
            fileName: "picture2",
            label: "Photo secondaire",
            description: "Une autre perspective de vos créations",
            icon: "🖼️",
        },
        {
            fileName: "picture3",
            label: "Photo d'ambiance",
            description: "Une photo montrant vos produits dans leur contexte",
            icon: "✨",
        },
        {
            fileName: "picture4",
            label: "Photo de vos produits",
            description: "Une photo de vos produits",
            icon: "📦",
        },
    ];

    const imagesArray = await Exposant.getFilesByUserId(userId);
    const images = imagesArray[0] as Record<string, string | null>;

    const missingImages = FilesUpload.filter(
        (file) => images[file.fileName] == null
    ).length;

    return (
        <Card className="w-full max-w-4xl mx-auto border-blue-100 shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ImageIcon className="h-6 w-6 text-violet-600" />
                        <CardTitle>Galerie de votre marque</CardTitle>
                    </div>
                    <Badge 
                        variant="outline" 
                        className={cn(
                            "bg-emerald-50 text-emerald-700 border-emerald-200",
                            missingImages > 0 && "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                    >
                        {missingImages > 0 ? `${missingImages} image${missingImages > 1 ? 's' : ''} manquante${missingImages > 1 ? 's' : ''}` : "Toutes les images sont chargées"}
                    </Badge>
                </div>
                <CardDescription>
                    Téléchargez les images qui représenteront votre marque sur notre plateforme
                </CardDescription>
            </CardHeader>
            <CardContent>
                {Object.values(images).every((image) => image !== null) ? (
                    <div className="mt-6 flex items-center bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-600" />
                        <div>
                            <p className="font-medium">Galerie complète</p>
                            <p className="text-sm text-emerald-600/80">
                                Toutes vos images sont bien chargées et prêtes à être publiées
                            </p>
                        </div>
                    </div>
                ) : (
                    <Tabs defaultValue="logo" className="w-full">
                        <ScrollArea className="w-full">
                            <TabsList className="w-full justify-start bg-transparent border-b rounded-none p-0 h-auto">
                                {FilesUpload.filter(
                                    (file) => images[file.fileName] == null
                                ).map((file) => (
                                    <TabsTrigger
                                        key={file.fileName}
                                        value={file.fileName}
                                        className="min-w-[160px] h-auto py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-violet-600 data-[state=active]:bg-transparent data-[state=active]:text-violet-600 rounded-none"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{file.icon}</span>
                                            <span>{file.label}</span>
                                        </div>
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
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{file.icon}</span>
                                            <h3 className="text-lg font-semibold">
                                                {file.label}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {file.description}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
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
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
}
