"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { VisitorSignupAction } from "@/action/(visitor)/visitor-signup/action";
import { CreateNotificationAction } from "@/action/(admin)/(notifications)/create/action";
import { toast } from "sonner";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

const formSchema = z.object({
    gender: GenderEnum,
    firstName: z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
    }),
    age: z.number().min(0, {
        message: "L'âge doit être un nombre positif",
    }),
    city: z.string().min(2, {
        message: "La ville doit contenir au moins 2 caractères",
    }),
    person: z.number().min(1, {
        message: "Le nombre de personnes doit être un nombre positif",
    }),
    company: z.string().min(2, {
        message: "Le nom de l'entreprise doit contenir au moins 2 caractères",
    }),
});

export default function EventForm() {
    const [isPro, setIsPro] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: GenderEnum.enum.MALE,
            firstName: "",
            lastName: "",
            email: "",
            age: 0,
            city: "",
            person: 1,
            company: "",
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const {
                firstName,
                lastName,
                email,
                gender,
                age,
                city,
                person,
                company,
            } = values;

            const response = await VisitorSignupAction({
                firstName,
                lastName,
                email,
                gender,
                age,
                city,
                person,
                company,
            });

            if (response.status === "error") {
                return toast.error(response.message);
            }

            toast.success("Formulaire soumis avec succès");

            if (isPro) {
                await Promise.all([
                    CreateNotificationAction({
                        title: "Nouvelle inscription",
                        description: "Nouvelle inscription pour l'événement",
                        type: "professionnel",
                    }),
                    fetch(`/api/send/visitor-signup`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...values,
                            ticketNumber: response.content,
                            isPro: true,
                        }),
                    }),
                ]);
            } else {
                await Promise.all([
                    CreateNotificationAction({
                        title: "Nouvelle inscription",
                        description: "Nouvelle inscription pour l'événement",
                        type: "visiteur",
                    }),
                    fetch(`/api/send/visitor-signup`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...values,
                            ticketNumber: response.content,
                            isPro: false,
                        }),
                    }),
                ]);
            }
            form.reset();
        } catch (error) {
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
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 bg-card rounded-lg p-4 border border-neutral-200"
            >
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jean" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dupont" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="jean.dupont@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Genre</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez un genre" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="MALE">
                                            Homme
                                        </SelectItem>
                                        <SelectItem value="FEMALE">
                                            Femme
                                        </SelectItem>
                                        <SelectItem value="OTHER">
                                            Autre
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Âge</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="30"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value) || 0
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="person"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Nombre de personnes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="1"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value) || 1
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl>
                                <Input placeholder="Paris" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="terms2"
                        checked={isPro}
                        onCheckedChange={(checked) =>
                            setIsPro(checked === true)
                        }
                    />
                    <label
                        htmlFor="terms2"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Vous êtes un professionnel ?
                    </label>
                </div>

                {isPro && (
                    <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Entreprise</FormLabel>
                                <FormControl>
                                    <Input placeholder="Google" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button type="submit" className="w-full">
                    Soumettre
                </Button>
            </form>
        </Form>
    );
}
