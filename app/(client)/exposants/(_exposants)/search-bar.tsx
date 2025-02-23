"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Exposant } from "@/lib/type";

export default function SearchBar({ exposants, setFilteredExposants }: { exposants: Exposant[], setFilteredExposants: (exposants: Exposant[]) => void }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchParam = searchParams.get("search") || "";
    const [globalFilter, setGlobalFilter] = useState<string>(searchParam);

    useEffect(() => {
        if (globalFilter !== searchParam) {
            setGlobalFilter(searchParam);
        }
    }, [searchParam]);

    const filteredExposants = useMemo(() => {
        if (!globalFilter) return exposants;
        return exposants.filter(exposant =>
            exposant.companyName.toLowerCase().includes(globalFilter.toLowerCase()) ||
            exposant.history.toLowerCase().includes(globalFilter.toLowerCase())
        );
    }, [globalFilter, exposants]);

    useEffect(() => {
        setFilteredExposants(filteredExposants);
    }, [filteredExposants, setFilteredExposants]);

    // Met à jour les paramètres de l'URL en fonction de `globalFilter`
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (globalFilter) {
            params.set("search", globalFilter);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    }, [globalFilter, router]);

    return (
        <div className="flex items-center gap-4 w-full">
            <Input
                placeholder="Rechercher un exposant..."
                className="max-w-sm"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
            />
        </div>
    );
}
