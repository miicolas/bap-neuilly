import { columns } from "./(_exposants-waiting)/columns"
import { DataTable } from "./(_exposants-waiting)/data-table"
import { ExposantAwaiting } from "@/lib/type"
import { Suspense } from "react"
import { ListWaitingExposantsAction } from "@/action/(admin)/(exposant)/list-waiting/action"

export default async function ExposantAwaitingDashboardPage() {
    const data = await ListWaitingExposantsAction()

    return (
        <div className="mx-auto p-12">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={data.content as ExposantAwaiting[]} />
            </Suspense>
        </div>
    )
}
