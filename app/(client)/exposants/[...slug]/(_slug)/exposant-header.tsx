import Image from "next/image";
import { Badge } from "@/components/ui/badge";
interface ExposantHeaderProps {
    logo: string | null;
    companyName: string;
    types: string[];
}

export const ExposantHeader = ({ logo, companyName, types }: ExposantHeaderProps) => (
    <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
                {logo && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                        <Image
                            src={(logo) || ""}
                            alt={`Logo ${companyName}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                        />
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {companyName}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {types.map((type) => (
                            <Badge
                                key={type}
                                variant="secondary"
                                className="text-xs"
                            >
                                {type}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
); 