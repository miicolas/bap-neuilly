import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { NotificationProps } from "@/lib/type";

export default function Notifications({
    index,
    item,
}: NotificationProps) {
    return (
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
    );
}