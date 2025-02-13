"use client";

import { Bell } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NotificationItem {
  title: string;
  description: string;
  url: string;
  read?: boolean;
  date?: string;
}

const Notification = () => {
  const data: NotificationItem[] = [
    {
      title: "Nouvelle mise à jour disponible",
      description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
      url: "#",
      date: "2023-11-20",
    },
    {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },
      {
        title: "Nouvelle mise à jour disponible",
        description: "Une nouvelle version de l'application est maintenant disponible. Cliquez pour voir les nouveautés.",
        url: "#",
        date: "2023-11-20",
      },

  ];

  const unreadCount = data.filter(item => !item.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="h-6 w-6 text-muted-foreground transition hover:text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[360px] p-0"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-semibold">Notifications</h3>
          {data.length > 0 && (
            <button className="text-sm text-muted-foreground hover:text-foreground">
              Tout marquer comme lu
            </button>
          )}
        </div>

        {data.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Aucune nouvelle notification
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto p-2 flex flex-col gap-2 items-start">
            {data.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link
                  href={item.url}
                  className={cn(
                    "flex flex-col items-baseline gap-2 rounded-md p-3 transition hover:bg-muted/50",
                    !item.read && "bg-muted/50",
                    "hover:bg-muted/80 focus:bg-muted/80"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium">{item.title}</h4>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  {item.date && (
                    <time className="mt-1 text-xs text-muted-foreground/80">
                      {new Date(item.date).toLocaleDateString()}
                    </time>
                  )}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;