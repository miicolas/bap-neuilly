import { Exposant } from "@/lib/type";
import CardExposant from "./card-exposant";

export default function ListExposants({
    exposants,
}: {
    exposants: Exposant[];
}) {
    if (!exposants || exposants.length === 0) {
        return <p className="text-center text-gray-500">Aucun exposant trouvé.</p>;
    }

    return (
        <ul className="flex flex-col gap-4">
            {exposants.map((exposant, index) => (
                <CardExposant key={index} exposant={exposant} />
            ))}
        </ul>
    );
}