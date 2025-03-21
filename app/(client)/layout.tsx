import Header from "@/components/header";

export default function ClientLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-[#3E4B86] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
        </div>
    );
}
