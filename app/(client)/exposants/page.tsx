import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import HeaderExposants from "./(_exposants)/header-exposants";
import { Exposant } from "@/lib/type";
import GridContent from "./(_exposants)/grid-content";

export default async function ExposantsPage() {
    const data = await ListExposantsAction();

    return (
        <div className="">
            <HeaderExposants />
            <GridContent content={data.content as Exposant[]} />
        </div>
    );
}