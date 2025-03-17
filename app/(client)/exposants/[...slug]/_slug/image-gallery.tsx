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

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    return (
        <div className="space-y-4">
            {images[selectedImageIndex]?.src && (
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                        src={images[selectedImageIndex].src}
                        alt={images[selectedImageIndex].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={priority}
                    />
                </div>
            )}

            <div className="grid grid-cols-4 gap-2">
                {images.map(
                    (image, index) =>
                        image.src && (
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
                                aria-label={`Voir ${image.alt}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 25vw, 12.5vw"
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );
}; 