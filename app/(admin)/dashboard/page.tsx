import InfluenceChart from "./(_dashboard)/(chart)/influence-chart"

import { ListVisitorsAction } from "@/action/(admin)/(visitor)/list/action"
import { Visitor } from "@/lib/type"

export default async function DashboardPage() {

    const visitors = await ListVisitorsAction()
    console.log(visitors, 'visitors')

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
            <h1 className="text-5xl font-bold text-center text-gray-900 dark:text-gray-100 mt-4">
                Dashboard
            </h1>
            <div className="flex flex-wrap gap-4 w-full">
                <InfluenceChart visitors={visitors.content as Visitor[]} />
            </div>
        </div>
    )
}