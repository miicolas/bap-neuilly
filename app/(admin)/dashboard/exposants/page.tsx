import { columns } from "./(_exposants)/columns"
import { DataTable } from "./(_exposants)/data-table"
import { ExposantAwaiting } from "@/lib/type"
import { Suspense } from "react"
import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action"

export default async function ExposantAwaitingDashboardPage() {
    const data = await ListExposantsAction()

    return (
        <div className="mx-auto p-12">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={data.content as ExposantAwaiting[]} />
            </Suspense>
        </div>
    )
}
