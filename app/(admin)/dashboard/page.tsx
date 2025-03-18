import InfluenceChart from "./(_dashboard)/(chart)/influence-chart";
import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import { ListVisitorsAction } from "@/action/(admin)/(visitor)/list/action";
import { Exposant, Visitor } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Calendar, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
    const visitors = await ListVisitorsAction();
    const exposants = await ListExposantsAction();
    
    const visitorsList = visitors.content as Visitor[];
    const exposantsList = exposants.content as Exposant[];

    const stats = {
        totalVisitors: visitorsList.length,
        totalExposants: exposantsList.length,
        pendingExposants: exposantsList.filter(e => e.status === "pending").length,
        activeExposants: exposantsList.filter(e => e.status === "accepted").length,
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
                <p className="text-muted-foreground">
                    Bienvenue sur votre espace administrateur
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Visiteurs
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalVisitors}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Exposants
                        </CardTitle>
                        <Store className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalExposants}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Exposants en attente
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingExposants}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Exposants actifs
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeExposants}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Statistiques d'influence</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <InfluenceChart
                            visitors={visitorsList}
                            exposants={exposantsList}
                        />
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Derniers inscrits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {visitorsList.slice(0, 5).map((visitor) => (
                                <div key={visitor.id} className="flex items-center">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {visitor.lastName}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Ticket: {visitor.ticketNumber}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
