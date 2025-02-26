import FormEvent from "./form-event";
import { Event } from "@/lib/type";

export default function EventTab({ event }: { event: Event }) {
    return (
        <div>
            <FormEvent event={event} />
        </div>
    );
}
