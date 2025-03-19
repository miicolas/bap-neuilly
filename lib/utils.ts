import { AcceptExposantAction } from "@/action/(admin)/(exposant)/accept/action";
import { RefuseExposantAction } from "@/action/(admin)/(exposant)/refuse/action";
import { Exposant as ExposantType } from "@/lib/type";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateTicketId(uuid: string) {
    if (!uuid) return null;

    const part1 = uuid.substring(0, 4);
    const part2 = uuid.substring(uuid.length - 4);
    const num1 = parseInt(part1, 16) % 10000;
    const num2 = parseInt(part2, 16) % 10000;

    return `SALON-${String(num1).padStart(4, "0")}-${String(num2).padStart(
        4,
        "0"
    )}`;
}

export function generateExposantId(uuid: string) {
    if (!uuid) return null;

    const part1 = uuid.substring(0, 4);
    const part2 = uuid.substring(uuid.length - 4);
    const num1 = parseInt(part1, 16) % 10000;
    const num2 = parseInt(part2, 16) % 10000;

    return `EXPOSANT-${String(num1).padStart(4, "0")}-${String(num2).padStart(
        4,
        "0"
    )}`;
}

export function limiteText(text: string, limit: number) {
    if (text.length > limit) {
        return text.substring(0, limit) + "...";
    }
    return text;
}

export function slugify(text: string) {
    return text.toLowerCase().replace(/ /g, "-");
}

const MINIO_BASE_URL =
    "https://minio-bap-neuilly.nicolas-becharat.com/bap-neuilly";

export const getMinioUrl = (path: string | null) =>
    path ? `${MINIO_BASE_URL}/${path}` : null;

export const handleAccept = async (id: string, exposant: ExposantType) => {
    const acceptExposant = await AcceptExposantAction({ id: id });
    if (acceptExposant.status === "success") {
        const sendEmail = await fetch("/api/send/exposant-validation", {
            method: "POST",
            body: JSON.stringify({
                firstName: exposant.firstName,
                lastName: exposant.lastName,
                email: exposant.email,
                companyName: exposant.companyName,
                siret: exposant.siret,
                adresse: exposant.adresse,
                city: exposant.city,
                postalCode: exposant.postalCode,
                exposantId: exposant.id,
            }),
        });
        if (sendEmail.status === 200) {
            toast.success(acceptExposant.message);
        } else {
            toast.error(acceptExposant.message);
        }
    } else {
        toast.error(acceptExposant.message);
    }
};

export const handleRefuse = async (id: string, exposant: ExposantType) => {
    const refuseExposant = await RefuseExposantAction({ id: id });
    if (refuseExposant.status === "success") {
        const sendEmail = await fetch("/api/send/exposant-refused", {
            method: "POST",
            body: JSON.stringify({
                firstName: exposant.firstName,
                lastName: exposant.lastName,
                email: exposant.email,
                companyName: exposant.companyName,
                siret: exposant.siret,
                adresse: exposant.adresse,
                city: exposant.city,
                postalCode: exposant.postalCode,
                exposantId: exposant.id,
            }),
        });
        if (sendEmail.status === 200) {
            toast.success(refuseExposant.message);
        } else {
            toast.error(refuseExposant.message);
        }
    } else {
        toast.error(refuseExposant.message);
    }
};
