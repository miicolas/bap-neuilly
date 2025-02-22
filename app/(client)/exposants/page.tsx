import { ListExposantsAction } from "@/action/(admin)/(exposant)/list/action";
import HeaderExposants from "./(_exposants)/header-exposants";
import ListExposants from "./(_exposants)/list-exposants";
import { Exposant } from "@/lib/type";

export default async function ExposantsPage() {

    const data = await ListExposantsAction();

    return (
        <div className="">
            <HeaderExposants />
            <ListExposants exposants={data.content as Exposant[]} />

        </div>
    );
}