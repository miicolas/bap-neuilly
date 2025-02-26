"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateEventAction } from "@/action/(admin)/(event)/update-event/action";
import { toast } from "sonner";
import { DatePickerWithRange } from "@/components/ui/data-picker";
import { Event } from "@/lib/type";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { DateRange } from "react-day-picker";

const formSchema = z.object({
    eventName: z.string().min(2, {
        message: "Le nom de l'événement doit contenir au moins 2 caractères",
    }),
    eventDate: z.object({
        from: z.date(),
        to: z.date().optional(),
    }),
    eventDateEnd: z.date().optional(),
    eventLocation: z.string().min(2, {
        message:
            "La localisation de l'événement doit contenir au moins 2 caractères",
    }),
    eventDescription: z.string().min(2, {
        message:
            "La description de l'événement doit contenir au moins 2 caractères",
    }),
});

export default function EventForm({ event }: { event: Event }) {
    const eventData = Array.isArray(event) ? event[0] : event;

    const initialFrom = eventData?.eventDate
        ? new Date(eventData.eventDate)
        : new Date();
    const initialTo = eventData?.eventDateEnd
        ? new Date(eventData.eventDateEnd)
        : undefined;

    const initialDateRange = {
        from: initialFrom,
        to: initialTo,
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: eventData?.eventName || "",
            eventDate: initialDateRange,
            eventDateEnd: initialTo,
            eventLocation: eventData?.eventLocation || "",
            eventDescription: eventData?.eventDescription || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const {
                eventName,
                eventDate,
                eventLocation,
                eventDescription,
                eventDateEnd,
            } = values;

            const finalEndDate = eventDate.to || eventDateEnd || new Date();

            const formattedData = {
                eventName,
                eventDate: eventDate.from,
                eventDateEnd: finalEndDate,
                eventLocation,
                eventDescription,
            };

            const response = await UpdateEventAction(formattedData);


            if (response.status === "error") {
                return toast.error(response.message);
            }

            toast.success("Événement mis à jour avec succès");
        } catch (error) {
            console.error("Erreur lors de la soumission:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue"
            );
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    console.error("Erreurs de validation:", errors);
                    toast.error("Le formulaire contient des erreurs");
                })}
                className="w-full space-y-4 bg-card rounded-lg p-4 border border-neutral-200"
            >
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="eventName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nom de l'événement</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nom de l'événement"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <DatePickerWithRange
                                        initialValue={initialDateRange}
                                        className="w-full"
                                        onDateChange={(selectedDate) => {
                                            field.onChange(selectedDate);
                                            if (selectedDate?.to) {
                                                form.setValue(
                                                    "eventDateEnd",
                                                    selectedDate.to
                                                );
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="eventLocation"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Localisation</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Localisation"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="eventDescription"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Mettre à jour l'événement
                </Button>
            </form>
        </Form>
    );
}
