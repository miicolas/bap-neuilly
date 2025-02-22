import { Exposant } from "@/lib/type";
import CardExposant from "./card-exposant";

export default async function ListExposants({
    exposants,
}: {
    exposants: Exposant[];
}) {
    return (
        <ul className="flex flex-col gap-4">
            {exposants.map((exposant, index) => (
                <CardExposant key={index} exposant={exposant} />
            ))}
        </ul>
    );
}