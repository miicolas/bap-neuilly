import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User2, ChevronUp } from "lucide-react"
import Link from "next/link"
import SignOut from "@/components/sign-out"

const items = [
  {
    title: "Accueil",
    url: "/dashboard",
    icon: Home,
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
]

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-neutral-100">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link href={item.url} key={item.title}>
                  <SidebarMenuItem >
                    <SidebarMenuButton>

                      <item.icon />
                      <span>{item.title}</span>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-(--radix-popper-anchor-width)"
              >
                <DropdownMenuItem>
                  <SignOut redirectTo="/login" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
