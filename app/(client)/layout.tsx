import Header from "@/components/header";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="bg-[#3E4B86] min-h-screen">
            <Header />
            {children}
        </main>
    );
}
