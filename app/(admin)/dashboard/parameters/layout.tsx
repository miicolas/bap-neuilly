import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paramètres",
    description: "Paramètres de l'application",
};

export default function LayoutParameter({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="p-4">{children}</div>;
}
