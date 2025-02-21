import { Button } from "@/components/ui/button";
import { Sheet } from "lucide-react";
import * as XLSX from "xlsx";
import { ExportExcelProps } from "@/lib/type";


export default function ExportExcel({ dataToExport }: ExportExcelProps) {

    const exportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const title = "exported_data";
        XLSX.writeFile(workbook, `${title}.xlsx`);
    }

    return (
        <Button variant="default" className="bg-green-700 text-white flex items-center justify-center gap-2" onClick={exportExcel}>
            <Sheet />
            <span className="text-sm">Export Excel</span>
        </Button>
    )
}