import InfluenceChart from "./(_dashboard)/(chart)/influence-chart";
import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import { ListVisitorsAction } from "@/action/(admin)/(visitor)/list/action";
import { Exposant, Visitor } from "@/lib/type";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Store, CalendarCheck, TrendingUp, ArrowRight, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Fonction pour générer un avatar de visiteur basé sur le nom
function getInitials(name: string): string {
    return name.charAt(0).toUpperCase() || "V";
}

// Fonction pour générer une couleur basée sur un string (pour les avatars)
function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
        'bg-pink-500', 'bg-orange-500', 'bg-indigo-500'
    ];
    return colors[Math.abs(hash) % colors.length];
}

export default async function DashboardPage() {
    const visitors = await ListVisitorsAction();
    const exposants = await ListExposantsAction();
    
    const visitorsList = visitors.content as Visitor[];
    const exposantsList = exposants.content as Exposant[];

    // Calcul des statistiques
    const stats = {
        totalVisitors: {
            count: visitorsList.length,
            trend: 8.2, // Exemple de tendance (à remplacer par un vrai calcul)
            isPositive: true
        },
        totalExposants: {
            count: exposantsList.length,
            trend: 12.5,
            isPositive: true
        },
        pendingExposants: {
            count: exposantsList.filter(e => e.status === "pending").length,
            trend: -3.2,
            isPositive: false
        },
        activeExposants: {
            count: exposantsList.filter(e => e.status === "accepted").length,
            trend: 4.5,
            isPositive: true
        }
    };

    return (
        <div className="p-6 space-y-8">
            {/* En-tête du tableau de bord */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Tableau de bord</h1>
                    <p className="text-muted-foreground mt-1">
                        Visualisez les performances et statistiques en temps réel
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                        Dernière mise à jour : aujourd'hui
                    </Badge>
                </div>
            </div>

            {/* Cartes de statistiques */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard 
                    title="Visiteurs inscrits"
                    value={stats.totalVisitors.count}
                    trend={stats.totalVisitors.trend}
                    isPositive={stats.totalVisitors.isPositive}
                    icon={<Users className="h-5 w-5" />}
                    color="blue"
                    link="/dashboard/visitors"
                />

                <StatsCard 
                    title="Total Exposants"
                    value={stats.totalExposants.count}
                    trend={stats.totalExposants.trend}
                    isPositive={stats.totalExposants.isPositive}
                    icon={<Store className="h-5 w-5" />}
                    color="violet"
                    link="/dashboard/exposants"
                />

                <StatsCard 
                    title="En attente"
                    value={stats.pendingExposants.count}
                    trend={stats.pendingExposants.trend}
                    isPositive={stats.pendingExposants.isPositive}
                    icon={<CalendarCheck className="h-5 w-5" />}
                    color="amber"
                    link="/dashboard/exposants-waiting"
                />

                <StatsCard 
                    title="Exposants actifs"
                    value={stats.activeExposants.count}
                    trend={stats.activeExposants.trend}
                    isPositive={stats.activeExposants.isPositive}
                    icon={<TrendingUp className="h-5 w-5" />}
                    color="emerald"
                    link="/dashboard/exposants"
                />
            </div>

            {/* Graphiques et listes */}
            <div className="grid gap-6 lg:grid-cols-7">
                {/* Graphique d'influence */}
                <Card className="col-span-7 lg:col-span-4 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-semibold">Statistiques d'influence</CardTitle>
                                <CardDescription>Évolution des inscriptions au fil du temps</CardDescription>
                            </div>
                            <Badge variant="outline" className="font-normal">30 derniers jours</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <InfluenceChart
                            visitors={visitorsList}
                            exposants={exposantsList}
                        />
                    </CardContent>
                </Card>

                {/* Derniers visiteurs inscrits */}
                <Card className="col-span-7 lg:col-span-3 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold">Derniers visiteurs</CardTitle>
                            <Link href="/dashboard/visitors" className="text-sm text-blue-600 flex items-center hover:underline">
                                Voir tous <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {visitorsList.slice(0, 5).map((visitor) => (
                                <div key={visitor.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className={cn("w-10 h-10", stringToColor(visitor.lastName))}>
                                            <AvatarFallback className="text-white">
                                                {getInitials(visitor.lastName)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <p className="font-medium text-neutral-900 line-clamp-1">
                                                {visitor.lastName}
                                            </p>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">
                                                    #{visitor.ticketNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Section d'actions rapides */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900">
                            <Users className="h-5 w-5 text-blue-600" />
                            Gestion Visiteurs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-blue-700 mb-4">Accédez à la liste complète des visiteurs inscrits à l'événement</p>
                        <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/dashboard/visitors" className="flex items-center">
                                Gérer les visiteurs <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-violet-900">
                            <Store className="h-5 w-5 text-violet-600" />
                            Gestion Exposants
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-violet-700 mb-4">Gérez les exposants actuellement acceptés pour l'événement</p>
                        <Button asChild variant="default" className="bg-violet-600 hover:bg-violet-700">
                            <Link href="/dashboard/exposants" className="flex items-center">
                                Gérer les exposants <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-amber-900">
                            <CalendarCheck className="h-5 w-5 text-amber-600" />
                            Demandes en attente
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-amber-700 mb-4">Étudiez et traitez les demandes d'exposants en attente</p>
                        <Button asChild variant="default" className="bg-amber-600 hover:bg-amber-700">
                            <Link href="/dashboard/exposants-waiting" className="flex items-center">
                                Voir les demandes <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Composant de carte de statistiques
function StatsCard({ title, value, trend, isPositive, icon, color, link }: { 
    title: string; 
    value: number; 
    trend: number; 
    isPositive: boolean; 
    icon: React.ReactNode; 
    color: 'blue' | 'violet' | 'amber' | 'emerald';
    link: string;
}) {
    const colors = {
        blue: {
            bg: 'bg-blue-50',
            iconBg: 'bg-blue-100',
            iconText: 'text-blue-600',
            trendPositive: 'text-emerald-600 bg-emerald-50',
            trendNegative: 'text-red-600 bg-red-50'
        },
        violet: {
            bg: 'bg-violet-50',
            iconBg: 'bg-violet-100',
            iconText: 'text-violet-600',
            trendPositive: 'text-emerald-600 bg-emerald-50',
            trendNegative: 'text-red-600 bg-red-50'
        },
        amber: {
            bg: 'bg-amber-50',
            iconBg: 'bg-amber-100',
            iconText: 'text-amber-600',
            trendPositive: 'text-emerald-600 bg-emerald-50',
            trendNegative: 'text-red-600 bg-red-50'
        },
        emerald: {
            bg: 'bg-emerald-50',
            iconBg: 'bg-emerald-100',
            iconText: 'text-emerald-600',
            trendPositive: 'text-emerald-600 bg-emerald-50',
            trendNegative: 'text-red-600 bg-red-50'
        }
    };

    const currentColors = colors[color];

    return (
        <Link href={link}>
            <Card className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2 rounded-md", currentColors.iconBg)}>
                            <div className={currentColors.iconText}>{icon}</div>
                        </div>
                        <div className={cn("px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1", 
                            isPositive ? currentColors.trendPositive : currentColors.trendNegative)}>
                            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {Math.abs(trend)}%
                        </div>
                    </div>
                    
                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                        <div className="text-2xl md:text-3xl font-bold">{value}</div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
