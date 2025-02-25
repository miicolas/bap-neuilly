import InfluenceChart from "./(_dashboard)/(chart)/influence-chart";
import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import { ListVisitorsAction } from "@/action/(admin)/(visitor)/list/action";
import { Exposant, Visitor } from "@/lib/type";

export default async function DashboardPage() {
    const visitors = await ListVisitorsAction();
    const exposants = await ListExposantsAction();
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
            <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mt-4">
                Dashboard
            </h1>
            <div className="flex flex-wrap gap-4 w-full">
                <InfluenceChart
                    visitors={visitors.content as Visitor[]}
                    exposants={exposants.content as Exposant[]}
                />
            </div>
        </div>
    );
}
