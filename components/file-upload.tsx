"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Upload, X, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { updateExposantImage } from "@/action/(exposant)/upload-image/action";
import { FileUploadProps } from "@/lib/type";

export default function FileUpload({
    fileName,
    label,
    maxSize = 5 * 1024 * 1024,
    acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
    isLogo = false,
    existingImage = null,
}: FileUploadProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string | null>(existingImage);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [imageSize, setImageSize] = useState<{
        width: number;
        height: number;
    } | null>(null);

    const validateImage = useCallback((file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const img: HTMLImageElement = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setImageSize({ width: img.width, height: img.height });
                if (isLogo) {
                    const ratio = img.width / img.height;
                    const isSquarish = ratio >= 0.9 && ratio <= 1.1;
                    const minSize = Math.min(img.width, img.height);
                    if (!isSquarish || minSize < 200) {
                        toast.error(
                            "Le logo doit être carré (ratio 1:1) et faire au minimum 200x200 pixels"
                        );
                        resolve(false);
                        return;
                    }
                }
                resolve(true);
            };
        });
    }, [isLogo]);

    const handleUpload = useCallback(async (selectedFile: File) => {
        setLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("fileName", fileName);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                const imageUrl = `https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly/${data.filename}`;
                setImageUrl(imageUrl);

                const updateResponse = await updateExposantImage({
                    imageId: data.id,
                    field: fileName,
                });

                if (updateResponse.status === "success") {
                    toast.success("Image téléchargée et associée avec succès");
                } else {
                    toast.error(
                        "L'image a été téléchargée mais n'a pas pu être associée à votre profil"
                    );
                }
            } else {
                toast.error(`Erreur: ${data.error}`);
            }
        } catch (error) {
            console.error("Erreur lors du téléchargement:", error);
            toast.error("Une erreur est survenue lors du téléchargement");
        } finally {
            setLoading(false);
            setUploadProgress(100);
        }
    }, [fileName]);

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0];

            if (selectedFile.size > maxSize) {
                toast.error(
                    "Le fichier est trop volumineux. Taille maximum: 5MB"
                );
                return;
            }

            if (!acceptedTypes.includes(selectedFile.type)) {
                toast.error(
                    "Type de fichier non supporté. Formats acceptés: JPG, PNG, WebP"
                );
                return;
            }

            const isValid = await validateImage(selectedFile);
            if (!isValid) return;

            await handleUpload(selectedFile);
        },
        [maxSize, acceptedTypes, handleUpload, validateImage]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
        },
        maxSize,
        multiple: false,
    });

    
    const handleRemove = () => {
        setImageUrl(null);
        setUploadProgress(0);
        setImageSize(null);
    };

    return (
        <div className="space-y-4 w-full max-w-xl">
            <Label htmlFor={fileName}>{label}</Label>

            {existingImage && (
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">
                        Image déjà téléchargée
                    </span>
                </div>
            )}

            {isLogo && (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Le logo doit être carré (ratio 1:1) et faire au minimum
                        200x200 pixels
                    </AlertDescription>
                </Alert>
            )}

            {!imageUrl && (
                <div
                    {...getRootProps()}
                    className={cn(
                        "border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out cursor-pointer",
                        "hover:border-primary/50 hover:bg-accent/50",
                        isDragActive
                            ? "border-primary bg-accent"
                            : "border-muted-foreground/25",
                        "flex flex-col items-center justify-center gap-4"
                    )}
                >
                    <input {...getInputProps()} />
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium">
                            {isDragActive
                                ? "Déposez votre image ici"
                                : "Glissez-déposez votre image ou cliquez pour sélectionner"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG ou WebP (max. 5MB)
                            {isLogo && ", format carré requis"}
                        </p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="space-y-2">
                    <Progress value={uploadProgress} className="h-1" />
                    <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm text-muted-foreground">
                            Téléchargement en cours...
                        </p>
                    </div>
                </div>
            )}

            {imageUrl && !existingImage && (
                <div
                    className={cn(
                        "relative rounded-lg overflow-hidden border",
                        isLogo ? "w-32 h-32" : "w-full"
                    )}
                >
                    <Image
                        src={imageUrl}
                        alt="Image téléchargée"
                        width={isLogo ? 128 : 400}
                        height={isLogo ? 128 : 400}
                        className={cn(
                            "object-cover",
                            isLogo ? "w-32 h-32" : "w-full h-auto"
                        )}
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    {imageSize && (
                        <p className="text-sm text-muted-foreground">
                            Dimensions: {imageSize.width} x {imageSize.height}{" "}
                            pixels
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
