import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
export default function DateLocation() {
    return (
        <div className="flex flex-col gap-8 mx-auto w-fit items-center -mt-16 pb-16">
            <div className="max-w-2xl  flex w-fit gap-8 p-6  text-white rounded-lg">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Dates et horaires</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="w-6 h-6 text-[#F5B7B1]" />
                            <span className="text-xl">Le 28 novembre 2025</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-[#F5B7B1]" />
                            <span className="text-xl">De 10h00 à 19h00</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Separator orientation="vertical" className="bg-white" />
                </div>
                <div className="flex flex-col gap-4 w-fit">
                    <h2 className="text-2xl font-bold w-fit">Adresse</h2>
                    <div className="flex items-start gap-3 w-fit">
                        <MapPin className="w-6 h-6 text-[#F5B7B1] mt-1" />
                        <div className="flex flex-col w-fit">
                            <span className="text-xl">Théâtre des Sablons</span>
                            <span className="text-xl">70 avenue du Roule</span>
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
