"use client";

import {
    Calendar,
    Inbox,
    Search,
    Settings,
    ChevronDown,
    LayoutDashboard,
    LucideIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import SignOut from "@/components/sign-out";
import { authClient } from "@/lib/auth-client";

import { unauthorized } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const { data: session } = await authClient.getSession();

const items = [
    {
        title: "Accueil",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Mes vendeurs",
        url: "/dashboard/exposants",
        icon: Inbox,
    },
    {
        title: "Vendeurs en attente",
        url: "/dashboard/exposants-waiting",
        icon: Calendar,
    },
    {
        title: "Inscriptions",
        url: "/dashboard/visitors",
        icon: Search,
    },
    {
        title: "Paramètres",
        url: "/dashboard/parameters",
        icon: Settings,
    },
];

export default function AppSidebar() {
    if (!session) {
        return unauthorized();
    }

    return (
        <Sidebar className="border-r border-neutral-200 bg-white shadow-sm h-screen">
            <div className="flex items-center justify-start px-4 py-6 border-b border-neutral-200">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-md mr-3">
                    <LayoutDashboard className="size-5" />
                </div>
                <h1 className="text-lg font-semibold text-neutral-900">
                    Admin Portal
                </h1>
            </div>

            <SidebarContent className="px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1.5">
                            {items.map((item) => (
                                <LinkItem key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-neutral-200 p-4 mt-auto">
                <div className="flex flex-col space-y-3">
                    <div className="bg-neutral-50 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-10 border-2 border-white shadow-sm">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                    {session.user.name
                                        ?.charAt(0)
                                        .toUpperCase() || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-neutral-900 truncate">
                                    {session.user.name}
                                </p>
                                <p className="text-xs text-neutral-500 truncate">
                                    {session.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors text-neutral-700">
                                <span>Options</span>
                                <ChevronDown className="size-4 opacity-70" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            side="top"
                            className="w-[--radix-popper-anchor-width]"
                        >
                            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:text-destructive cursor-pointer">
                                <SignOut redirectTo="/login" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

function LinkItem({
    item,
}: {
    item: { title: string; url: string; icon: LucideIcon };
}) {
    const pathname = usePathname();

    const isActive =
        pathname === item.url ||
        (item.url !== "/dashboard" &&
            (pathname?.startsWith(item.url + "/") || pathname === item.url));

    return (
        <Link href={item.url}>
            <SidebarMenuItem className="group">
                <SidebarMenuButton
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 relative overflow-hidden",
                        isActive
                            ? "text-blue-600 bg-blue-50"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    )}
                >
                    {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-r-full" />
                    )}
                    <item.icon
                        className={cn(
                            "size-4 shrink-0",
                            isActive
                                ? "text-blue-600"
                                : "text-neutral-500 group-hover:text-neutral-700"
                        )}
                    />
                    <span>{item.title}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </Link>
    );
}
