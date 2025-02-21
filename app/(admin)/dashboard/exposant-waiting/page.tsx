import { columns } from "./(_exposant-waiting)/columns"
import { DataTable } from "./(_exposant-waiting)/data-table"
import { ExposantAwaiting } from "@/lib/type"
import { Suspense } from "react"
import { ListAwaitingExposantsAction } from "@/action/(admin)/(exposant)/list-awaiting/action"

export default async function ExposantAwaitingDashboardPage() {
    const data = await ListAwaitingExposantsAction()

    return (
        <div className="mx-auto p-12">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={data.content as ExposantAwaiting[]} />
            </Suspense>
        </div>
    )
}
