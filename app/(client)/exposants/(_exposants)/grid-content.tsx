"use client";

import ListExposants from "./list-exposants";
import { Exposant } from "@/lib/type";
import SearchBar from "./search-bar";
import { useState } from "react";

export default function GridContent({ content }: { content: Exposant[] }) {
    const [filteredExposants, setFilteredExposants] = useState<Exposant[]>(content);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-9">
                <ListExposants exposants={filteredExposants} />
            </div>
            <div className="md:col-span-3">
                <SearchBar exposants={content} setFilteredExposants={setFilteredExposants} />
            </div>
        </div>
    );
}
