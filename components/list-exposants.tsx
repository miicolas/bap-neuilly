import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Exposant } from "@/lib/type";
import Image from "next/image";
import { getMinioUrl } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";

export function ListExposants({ exposants, className }: { exposants: Exposant[], className?: string }) {
    return (
        <div className={`space-y-8 py-16 mx-auto ${className}` }>
            <div className="space-y-2">
                <h2 className="text-4xl font-bold text-neutral-200">Nos exposants</h2>
                <p className="text-lg text-neutral-300">
                    Découvrez les créateurs qui seront présents au salon
                </p>
            </div>

            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {exposants.length === 0 ? (
                        <CarouselItem>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">
                                            Aucun exposant trouvé
                                        </span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ) : (
                        exposants.map((exposant, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                            >
                                <Link
                                    href={`/exposants/${exposant.slug}`}
                                    className="block group bg-white rounded-xl transition-all duration-300"
                                >
                                    <div className="space-y-4">
                                        <div className="relative overflow-hidden rounded-t-xl aspect-[4/3]">
                                            <Image
                                                src={
                                                    getMinioUrl(
                                                        exposant.images?.[0]
                                                            ?.picture || ""
                                                    ) || "/placeholder.jpg"
                                                }
                                                alt={exposant.companyName}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="space-y-3 p-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                    {exposant.companyName}
                                                </h3>
                                                <div className="flex items-center text-slate-500 text-sm mt-1">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    Neuilly-sur-Seine
                                                </div>
                                            </div>

                                            <div className="space-y-3 pb-2">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {exposant.type
                                                        .split(",")
                                                        .map((type, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="secondary"
                                                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 border-0"
                                                            >
                                                                {type.trim()}
                                                            </Badge>
                                                        ))}
                                                </div>
                                                <div className="flex items-center text-sm text-indigo-600 font-medium">
                                                    <span>Découvrir</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 border-0 bg-white shadow-lg text-slate-700 hover:bg-slate-50" />
                <CarouselNext className="hidden md:flex -right-12 border-0 bg-white shadow-lg text-slate-700 hover:bg-slate-50" />
            </Carousel>
        </div>
    );
}
