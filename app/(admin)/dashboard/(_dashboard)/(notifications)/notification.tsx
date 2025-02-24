
'use client';

import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NotificationProps } from "@/lib/type";
import { ReadNotificationAction } from "@/action/(admin)/(notifications)/read/action";
import { toast } from "sonner";

export default function Notifications({
    key,
    item,
}: NotificationProps) {

    const readNotification = async () => {
        const response = await ReadNotificationAction({
            id: item.id as string,
        });
        if (response.status !== "success") {
            toast.error(response.message);
        } else {
            toast.success("Notification lue avec succès");
        }
    }
    return (
        <DropdownMenuItem key={key} asChild>
            <Link
                href={'/notifications/' + item.id}
                className={cn(
                    "flex flex-col gap-2 rounded-md p-3 transition hover:bg-muted/50 w-full items-start",
                    !item.read && "bg-muted/50",
                    "hover:bg-muted/80 focus:bg-muted/80"
                )}
                onClick={readNotification}
            >
                <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium">{item.title}</h4>
                    {!item.read && (
                        <span className="size-2 rounded-full bg-primary" />
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
    );
}