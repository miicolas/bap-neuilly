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
import { ArrowRight } from "lucide-react";

export function ListExposants({ exposants }: { exposants: Exposant[] }) {

    console.log(exposants, 'exposants');

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-[98%]"
        >
            <CarouselContent>
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
                        <Link 
                            href={`/exposants/${exposant.slug}`} 
                            key={index}
                            className="block"
                        >
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="overflow-hidden group">
                                        <CardContent className="p-0">
                                            <div className="relative w-full h-48">
                                                <Image
                                                    src={getMinioUrl(exposant.images?.[0]?.picture || "") || ""}
                                                    alt={exposant.companyName}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-2">
                                                        {exposant.companyName}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exposant.type.split(",").map((type, idx) => (
                                                            <Badge 
                                                                key={idx} 
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {type.trim()}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <span>Voir plus</span>
                                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        </Link>
                    ))
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
