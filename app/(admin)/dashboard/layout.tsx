import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "./(_dashboard)/sidebar"
import HeaderDashboard from "./(_dashboard)/header"

export const metadata: Metadata = {
    title: "Admin",
    description: "Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
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
    )
}
