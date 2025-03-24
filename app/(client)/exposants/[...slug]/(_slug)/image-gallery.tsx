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
    const thumbnailImages = images.slice(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    if (!thumbnailImages.length) return null;

    return (
        <div className="space-y-3">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                    src={thumbnailImages[selectedImageIndex]?.src || ""}
                    alt={thumbnailImages[selectedImageIndex]?.alt || "Image principale"}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={priority}
                />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {thumbnailImages.slice(0, 3).map(
                    (thumbnailImage, index) =>
                        thumbnailImage.src && (
                            <div
                                key={index}
                                className={`relative aspect-square rounded-lg overflow-hidden bg-white cursor-pointer border ${
                                    selectedImageIndex === index
                                        ? "border-[#474F9E] border-2"
                                        : "border-gray-200"
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
                                    className="object-contain p-2"
                                    sizes="(max-width: 768px) 33vw, 16vw"
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );
}; 