"use client";

import { useState, useEffect } from "react";

interface FilterProps {
    types: string[];
    products: string[];
    setFilters: (filters: { type: string; product: string }) => void;
}

export default function Filters({ types, products, setFilters }: FilterProps) {
    const [typeFilter, setTypeFilter] = useState("");
    const [productFilter, setProductFilter] = useState("");

    useEffect(() => {
        setFilters({ type: typeFilter, product: productFilter });
    }, [typeFilter, productFilter, setFilters]);

    const sortedTypes = [...new Set(types)].sort();
    const sortedProducts = [...new Set(products)].sort();

    return (
        <div className="flex flex-wrap my-4 gap-4 items-center w-full">
            <select
                className="border p-2 rounded-md w-full"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
            >
                <option value="">Tous les types</option>
                {sortedTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <select
                className="border p-2 rounded-md w-full"
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
            >
                <option value="">Tous les produits</option>
                {sortedProducts.map((product) => (
                    <option key={product} value={product}>
                        {product}
                    </option>
                ))}
            </select>
        </div>
    );
}
