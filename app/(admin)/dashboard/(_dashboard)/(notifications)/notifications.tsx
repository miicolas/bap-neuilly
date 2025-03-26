import { Bell, Check, Clock } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Notification from "./notification";
import { ListNotificationAction } from "@/action/(admin)/(notifications)/list/action";
import { MarkAllAsReadAction } from "@/action/(admin)/(notifications)/mark-all-read/action";
import { NotificationItem } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

const Notifications = async () => {
    const response = await ListNotificationAction();

    if (response.status !== "success") {
        return (
            <div className="p-4 text-center text-sm text-red-500">
                Erreur lors du chargement des notifications
            </div>
        );
    }

    const data = response.content as NotificationItem[];
    const unreadCount = data.filter((item) => !item.read).length;
    const recentNotifications = data.filter((item) => !item.read).slice(0, 5);
    const olderNotifications = data.filter((item) => item.read).slice(0, 10);

    async function markAllAsRead() {
        "use server";
        await MarkAllAsReadAction();
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="relative border-none bg-transparent hover:bg-slate-100 transition-all duration-200"
                >
                    <Bell className="size-5 text-muted-foreground transition hover:text-foreground" />
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex min-w-5 h-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white px-1 font-semibold animate-pulse">
                            {unreadCount}
                        </span>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-[420px] p-0 rounded-xl shadow-lg border-slate-200"
                sideOffset={8}
            >
                <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-t-lg">
                    <div className="flex items-center justify-between p-4 pb-2">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Bell className="h-4 w-4 text-blue-700" />
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                                    {unreadCount}{" "}
                                    {unreadCount === 1
                                        ? "nouvelle"
                                        : "nouvelles"}
                                </span>
                            )}
                        </h3>
                    </div>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <div className="bg-gradient-to-r from-blue-50 to-violet-50 px-4 pb-1">
                        <TabsList className="h-8 bg-white/50 grid w-full grid-cols-3">
                            <TabsTrigger value="all" className="text-xs">
                                Toutes
                            </TabsTrigger>
                            <TabsTrigger value="unread" className="text-xs">
                                Non lues
                            </TabsTrigger>
                            <TabsTrigger value="archive" className="text-xs">
                                Archivées
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        {data.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center gap-2">
                                <Bell className="h-8 w-8 text-slate-300" />
                                <p className="text-sm text-muted-foreground font-medium">
                                    Aucune notification
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Vous serez informé des nouvelles activités
                                </p>
                            </div>
                        ) : (
                            <ScrollArea className="max-h-[400px]">
                                <div className="flex flex-col gap-1 p-1">
                                    {data.map((item, index) => (
                                        <Notification key={index} item={item} />
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </TabsContent>

                    <TabsContent value="unread" className="mt-0">
                        {recentNotifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center gap-2">
                                <Check className="h-8 w-8 text-slate-300" />
                                <p className="text-sm text-muted-foreground font-medium">
                                    Tout est à jour
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Vous n'avez pas de notifications non lues
                                </p>
                            </div>
                        ) : (
                            <ScrollArea className="max-h-[400px]">
                                <div className="flex flex-col gap-1 p-1">
                                    {recentNotifications.map((item, index) => (
                                        <Notification key={index} item={item} />
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </TabsContent>

                    <TabsContent value="archive" className="mt-0">
                        {olderNotifications.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center gap-2">
                                <Clock className="h-8 w-8 text-slate-300" />
                                <p className="text-sm text-muted-foreground font-medium">
                                    Pas d'historique
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Aucune notification archivée
                                </p>
                            </div>
                        ) : (
                            <ScrollArea className="max-h-[400px]">
                                <div className="flex flex-col gap-1 p-1">
                                    {olderNotifications.map((item, index) => (
                                        <Notification key={index} item={item} />
                                    ))}
                                </div>
                            </ScrollArea>
                        )}
                    </TabsContent>
                </Tabs>

                <DropdownMenuSeparator />

                <div className="p-2 flex justify-between items-center bg-slate-50">
                    {unreadCount > 0 ? (
                        <form action={markAllAsRead}>
                            <Button
                                type="submit"
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs w-full flex items-center gap-1 text-blue-700 hover:text-blue-800 hover:bg-blue-50/80"
                            >
                                <Check className="h-3.5 w-3.5" />
                                Tout marquer comme lu
                            </Button>
                        </form>
                    ) : (
                        <div className="text-xs text-slate-500 pl-2">
                            Toutes les notifications sont lues
                        </div>
                    )}

                    <Link
                        href="/dashboard/notifications"
                        className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1 rounded transition-colors"
                    >
                        Voir tout
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
