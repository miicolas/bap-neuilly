import { Exposant } from "@/models/exposant";
import FormExposant from "./(...companyName)/form-exposant";
import { Exposant as ExposantType } from "@/lib/type";
import AsideExposant from "./(...companyName)/aside-exposant";

interface ExposantDashboardPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ExposantDashboardPage({
    params,
}: ExposantDashboardPageProps) {
    const { slug } = await params;

    const exposantData = await Exposant.getExposantBySlug(slug);

    if (!exposantData) {
        return <div>Exposant non trouvé</div>;
    }

    const exposant = exposantData as ExposantType;

    return (
        <div className="flex gap-6">
            <FormExposant exposant={exposant} />
            <AsideExposant id={exposant.id || ""} status={exposant.status} />
        </div>
    );
}
