import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./(_dashboard)/sidebar";
import HeaderDashboard from "./(_dashboard)/header";
import { getSession } from "@/lib/session";
import { unauthorized } from "next/navigation";
import { getRole } from "@/lib/get-role";
export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    if (!session) {
        return unauthorized();
    }
    const checkRole = await getRole(session.user.email);
    if (checkRole !== "ADMIN") {
        return unauthorized();
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <HeaderDashboard />
                <div className="block lg:hidden mt-2">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}
