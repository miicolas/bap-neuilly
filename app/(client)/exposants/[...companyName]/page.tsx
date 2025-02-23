"use client";

import { useParams } from "next/navigation";

export default function ExposantPage () {

    const params = useParams();
    const companyName = params.companyName;

    return (
        <div className="flex flex-col items-start py-16 px-36">
            <h1 className="text-3xl font-bold">{companyName}</h1>
        </div>
    );
}