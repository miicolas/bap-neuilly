import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inscription Exposant",
    description: "Inscrivez vous pour participer en tant qu'Exposant à la prochaine édition du Salon des créateurs d'objects et artisans de Neuilly",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main
            className={`mx-auto px-4 sm:px-6 antialiased w-full bg-neutral-50 dark:bg-neutral-900`}
        >
            {children}
        </main>
    );
}
