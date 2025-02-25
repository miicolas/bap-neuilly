import { Exposant } from "@/models/exposant";
import FormExposant from "./(...companyName)/form-exposant";
import { Exposant as ExposantType } from "@/lib/type";
import AsideExposant from "./(...companyName)/aside-exposant";
interface ExposantDashboardPageProps {
    params: Promise<{ companyName: string }>;
}

export default async function ExposantDashboardPage({ params }: ExposantDashboardPageProps) {
    const { companyName } = await params;

    const exposant = await Exposant.getExposantByCompanyName(companyName);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">
                {exposant[0].companyName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-12 w-full p-4 gap-4">
                <div className="md:col-span-8">
                    <FormExposant exposant={exposant[0] as ExposantType} />
                </div>
                <div className="md:col-span-4 sticky top-0 h-screen">
                    <AsideExposant id={exposant[0].id} status={exposant[0].status} />
                </div>
            </div>
        </div>
    );
}