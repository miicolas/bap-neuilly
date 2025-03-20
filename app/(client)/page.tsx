import Hero from "@/components/hero";
import DateLocation from "@/components/date-location";
import PictureSalon from "@/components/picture-salon";
import CardLp from "@/components/card-lp";
import { ListExposants } from "@/components/list-exposants";
import { GetExposantSelectAction } from "@/action/(admin)/(exposant)/get-select/action";
import { notFound } from "next/navigation";
import { Exposant } from "@/lib/type";
export default async function Page() {
    const exposants = await GetExposantSelectAction();
    if (exposants.status === "error") {
        return notFound();
    }
    return (
        <div className="">
            <Hero />
            <DateLocation />
            <PictureSalon />
            <div className="flex flex-col lg:flex-row gap-8 w-full justify-center items-center py-16">
                <CardLp type="exposant" />
                <CardLp type="visiteur" />
            </div>
            <ListExposants exposants={exposants.content as Exposant[]} className="w-[85%] mx-auto" />
        </div>
    );
}
