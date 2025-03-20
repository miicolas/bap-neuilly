"use client";

import { useState, useMemo } from "react";
import ListExposants from "./list-exposants";
import SearchBar from "./search-bar";
import Filters from "./filter-exposants";
import { Exposant } from "@/lib/type";

export default function GridContent({ content }: { content: Exposant[] }) {
    const [filteredExposants, setFilteredExposants] = useState(content);
    const [filters, setFilters] = useState({ type: "", product: "" });

    const types = [...new Set(content.flatMap((expo) => expo.type.split(",").map((t) => t.trim())))];

    const products = [...new Set(content.flatMap((expo) => expo.products.split(",").map((p) => p.trim())))];

    const filteredResults = useMemo(() => {
        return filteredExposants.filter((expo) => {
            const expoTypes = expo.type.split(",").map((t) => t.trim());
            const expoProducts = expo.products.split(",").map((p) => p.trim());

            const matchesType = !filters.type || expoTypes.includes(filters.type);
            const matchesProduct = !filters.product || expoProducts.includes(filters.product);
            return matchesType && matchesProduct;
        });
    }, [filteredExposants, filters]);

    return (
        <div className="flex flex-col-reverse md:grid sm:grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-9">
                <ListExposants exposants={filteredResults} />
            </div>
            <div className="md:col-span-3 pb-6 md:pb-4">
                <SearchBar exposants={content} setFilteredExposants={setFilteredExposants} />
                <Filters types={types} products={products} setFilters={setFilters} />
            </div>
        </div>
    );
}
