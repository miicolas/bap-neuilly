import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EventTab from "./event-tab";
import { Event } from "@/lib/type";
import { ListEventAction } from "@/action/(admin)/(event)/list/action";

export default async function TabsParameter() {
    
    const data = await ListEventAction();

    return (
        <Tabs defaultValue="event" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="event" >L'évènement</TabsTrigger>
                <TabsTrigger value="admin">Administration</TabsTrigger>
            </TabsList>
            <TabsContent value="event">
                <div className="max-w-4xl">
                    <EventTab event={data.content as unknown as Event} />
                </div>
            </TabsContent>
            <TabsContent value="admin">
                <p>Administration</p>
            </TabsContent>
        </Tabs>
    );
}
