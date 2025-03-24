"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
    images: {
        src: string | null;
        alt: string;
    }[];
    priority?: boolean;
}

export const ImageGallery = ({ images, priority = false }: ImageGalleryProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const thumbnailImages = images.slice(1);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="space-y-4">
            {thumbnailImages[selectedImageIndex]?.src && (
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                        src={thumbnailImages[selectedImageIndex].src}
                        alt={thumbnailImages[selectedImageIndex].alt}
                        fill
                        className="object-cover p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={priority}
                    />
                </div>
            )}

            <div className="grid grid-cols-4 gap-2">
                {thumbnailImages.map(
                    (thumbnailImage, index) =>
                        thumbnailImage.src && (
                            <div
                                key={index}
                                className={`relative aspect-square rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer transition-all ${
                                    selectedImageIndex === index
                                        ? "ring-2 ring-primary"
                                        : "hover:ring-2 hover:ring-primary"
                                }`}
                                onClick={() => handleImageClick(index)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        handleImageClick(index);
                                    }
                                }}
                                aria-label={`Voir ${thumbnailImage.alt}`}
                            >
                                <Image
                                    src={thumbnailImage.src}
                                    alt={thumbnailImage.alt}
                                    fill
                                    className="object-cover p-4"
                                    sizes="(max-width: 768px) 25vw, 12.5vw"
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );
}; 