import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ExposantHeaderProps {
    logo: string | null;
    companyName: string;
    types: string[];
}

export const ExposantHeader = ({ logo, companyName, types }: ExposantHeaderProps) => (
    <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4">
            <div className="flex items-center gap-4">
                {logo && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
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
                    <div className="flex flex-wrap gap-2 mt-1">
                        {types.map((type) => (
                            <span
                                key={type}
                                className="text-sm text-gray-500"
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
); 