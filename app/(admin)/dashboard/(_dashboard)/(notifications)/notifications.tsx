import { Bell } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Notification from "./notification"
import { cn } from "@/lib/utils";
import { ListNotificationAction } from "@/action/(admin)/(notifications)/list/action";
import { NotificationItem } from "@/lib/type";

const Notifications = async () => {
  const response = await ListNotificationAction();

  if (response.status !== "success") {
    return <div className="p-4 text-center text-sm text-red-500">Error loading notifications</div>;
  }

  const data = response.content as NotificationItem[];
  const unreadCount = data.filter((item) => !item.read).length;

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

      <DropdownMenuContent align="end" className="w-[360px] p-0">
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
              <Notification key={index} item={item} />
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export default Notifications;