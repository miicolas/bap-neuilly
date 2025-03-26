"use client";

import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NotificationProps } from "@/lib/type";
import { ReadNotificationAction } from "@/action/(admin)/(notifications)/read/action";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import {
    Store,
    Users,
    Calendar,
    CheckCircle,
    AlertTriangle,
    Info,
} from "lucide-react";

export default function Notification({ key, item }: NotificationProps) {
    const readNotification = async () => {
        try {
            const response = await ReadNotificationAction({
                id: item.id as string,
            });
            if (response.status !== "success") {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erreur lors du marquage de la notification comme lue");
        }
    };

    const getUrl = () => {
        if (item.type === "exposant") {
            return "/dashboard/exposants-waiting/";
        }
        return "/dashboard/visitors/";
    };

    const getIcon = () => {
        switch (item.type) {
            case "exposant":
                return <Store className="h-5 w-5 text-violet-500" />;
            case "visitor":
                return <Users className="h-5 w-5 text-blue-500" />;
            case "event":
                return <Calendar className="h-5 w-5 text-emerald-500" />;
            case "alert":
                return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            case "success":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            default:
                return <Info className="h-5 w-5 text-slate-500" />;
        }
    };

    const formattedDate = item.date
        ? formatDistanceToNow(new Date(item.date), {
              addSuffix: true,
              locale: fr,
          })
        : "";

    return (
        <DropdownMenuItem key={key} asChild className="cursor-pointer">
            <Link
                href={getUrl()}
                className={cn(
                    "flex gap-3 rounded-md p-3 transition w-full",
                    !item.read
                        ? "bg-blue-50/80 hover:bg-blue-100/70"
                        : "hover:bg-slate-100/80",
                    "border-l-4",
                    !item.read ? "border-l-blue-500" : "border-l-transparent"
                )}
                onClick={readNotification}
            >
                <div className="flex-shrink-0 mt-1">{getIcon()}</div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h4
                            className={cn(
                                "font-medium text-sm",
                                !item.read && "text-blue-800"
                            )}
                        >
                            {item.title}
                        </h4>
                        {!item.read && (
                            <span className="size-2 rounded-full bg-blue-600 mr-1" />
                        )}
                    </div>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {item.description}
                    </p>
                    {item.date && (
                        <time className="block text-xs text-muted-foreground/80 italic">
                            {formattedDate}
                        </time>
                    )}
                </div>
            </Link>
        </DropdownMenuItem>
    );
}
