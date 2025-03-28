import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inscription visiteur",
    description: "Inscrivez vous pour participer à la prochaine édition du Salon des créateurs d'objects et artisans de Neuilly",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main
            className={`max-w-7xl mx-auto px-4 sm:px-6 antialiased w-full`}
        >
            {children}
        </main>
    );
}
