import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { GetEventDetailsAction } from "@/action/(visitor)/event-details/action";
import { notFound } from "next/navigation";

interface EventDetails {
    dayEvent: string[];
    dayEventEnd: string[];
    localisation: string[];
}

export default async function DateLocation() {
    const data = await GetEventDetailsAction();
    if (data.status === "error") {
        return notFound();
    }

    const eventDetails = data.content as EventDetails;
    if (!eventDetails || !eventDetails.dayEvent[0] || !eventDetails.localisation[0]) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-8 mx-auto w-fit items-center -mt-16 pb-16">
            <div className="max-w-2xl  flex w-fit gap-8 p-6  text-white rounded-lg">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Dates et horaires</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="w-6 h-6 text-[#F5B7B1]" />
                            <span className="text-xl">{eventDetails.dayEvent[0]}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-[#F5B7B1]" />
                            <span className="text-xl">{eventDetails.dayEventEnd[0]}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Separator orientation="vertical" className="bg-white" />
                </div>
                <div className="flex flex-col gap-4 w-fit">
                    <h2 className="text-2xl font-bold w-fit">Adresse</h2>
                    <div className="flex items-center gap-3 w-fit">
                        <MapPin className="w-6 h-6 text-[#F5B7B1] mt-1" />
                        <div className="flex flex-col w-fit">
                            <span className="text-xl">{eventDetails.localisation[0]}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Image
                    src="/images/neuilly.png"
                    alt="map"
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
}
