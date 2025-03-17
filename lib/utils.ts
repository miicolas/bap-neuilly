import { clsx, type ClassValue } from "clsx";
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

