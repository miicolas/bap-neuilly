import { columns } from "./(_visitors)/columns"
import { DataTable } from "./(_visitors)/data-table"
import { Visitor } from "@/lib/type"
import { ListVisitorsAction } from "@/action/(visitor)/list/action"
import { Suspense } from "react"

export default async function VisitorsDashboardPage() {
    const data = await ListVisitorsAction()

    return (
        <div className="mx-auto p-12">
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable columns={columns} data={data.content as Visitor[]} />
            </Suspense>
        </div>
    )
}
