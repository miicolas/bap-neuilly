import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Connexion",
    description: "Connexion à votre espace",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div
            className={`max-w-7xl mx-auto px-4 sm:px-6 antialiased w-full`}
        >
            {children}
        </div>
    );
}
