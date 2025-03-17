"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Exposant } from "@/lib/type";
import { Search } from "lucide-react";

export default function SearchBar({
    exposants,
    setFilteredExposants,
}: {
    exposants: Exposant[];
    setFilteredExposants: (exposants: Exposant[]) => void;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const initialSearchValue = searchParams.get("search") || "";
    const [searchValue, setSearchValue] = useState<string>(initialSearchValue);

    const filteredExposants = useMemo(() => {
        if (!searchValue.trim()) return exposants;

        const searchLower = searchValue.toLowerCase();
        return exposants.filter(
            (exposant) =>
                exposant.companyName.toLowerCase().includes(searchLower) ||
                exposant.history.toLowerCase().includes(searchLower) ||
                exposant.products?.toLowerCase().includes(searchLower) ||
                exposant.type?.toLowerCase().includes(searchLower)
        );
    }, [searchValue, exposants]);

    useEffect(() => {
        setFilteredExposants(filteredExposants);
    }, [filteredExposants, setFilteredExposants]);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setSearchValue(newValue);

            const params = new URLSearchParams(searchParams);
            if (newValue.trim()) {
                params.set("search", newValue);
            } else {
                params.delete("search");
            }

            router.replace(`${pathname}?${params.toString()}`);
        },
        [searchParams, pathname, router]
    );

    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
                placeholder="Rechercher un exposant..."
                className="pl-10"
                value={searchValue}
                onChange={handleSearchChange}
                aria-label="Rechercher des exposants"
            />
        </div>
    );
}
