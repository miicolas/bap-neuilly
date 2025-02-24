"use client";

import { Exposant } from "@/lib/type";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
const formSchema = z.object({
    firstname: z.string().min(2, {
        message: "Le prénom d'utilisateur doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    type: z.enum(["EXPOSANT", "VISITEUR"]),
    email: z.string().email({
        message: "Veuillez entrer une adresse email valide",
    }),
    adresse: z.string().min(2, {
        message: "L'adresse doit contenir au moins 2 caractères",
    }),
    city: z.string().min(2, {
        message: "La ville doit contenir au moins 2 caractères",
    }),
    postalCode: z
        .string()
        .min(2, {
            message: "Le code postal doit contenir au moins 2 caractères",
        })
        .max(5, {
            message: "Le code postal doit contenir 5 caractères",
        }),
    siret: z
        .string()
        .min(2, {
            message: "Le siret doit contenir au moins 2 caractères",
        })
        .max(14, {
            message: "Le siret doit contenir 14 caractères",
        }),
    products: z.string().min(2, {
        message: "Le produit doit contenir au moins 2 caractères",
    }),
    history: z.string().min(2, {
        message:
            "La description de votre histoire doit contenir au moins 2 caractères",
    }),
    companyName: z.string().min(2, {
        message: "Le nom de votre société doit contenir au moins 2 caractères",
    }),
    status: z.enum(["pending", "accepted", "refused"]),
    userId: z.string(),
    logo: z.string().optional(),
    picture: z.string().optional(),
    picture2: z.string().optional(),
    picture3: z.string().optional(),
    picture4: z.string().optional(),
    exposantId: z.string().optional(),
});

export default function FormExposant({ exposant }: { exposant: Exposant }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: exposant.firstName,
            lastName: exposant.lastName,
            email: exposant.email,
            type: exposant.type as "EXPOSANT" | "VISITEUR",
            adresse: exposant.adresse,
            city: exposant.city,
            postalCode: exposant.postalCode,
            siret: exposant.siret,
            products: exposant.products,
            history: exposant.history,
            companyName: exposant.companyName,
            status: exposant.status as "pending" | "accepted" | "refused",
            userId: exposant.userId,
            logo: exposant.logo,
            picture: exposant.picture,
            picture2: exposant.picture2,
            picture3: exposant.picture3,
            picture4: exposant.picture4,
            exposantId: exposant.exposantId || "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full max-w-4xl bg-card p-4 rounded-md border border-neutral-200"
            >
                <div className="flex items-start justify-start gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Prénom"
                                        {...field}
                                        disabled
                                    />
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
                                    <Input
                                        placeholder="Nom"
                                        {...field}
                                        disabled
                                    />
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
                                    placeholder="Email"
                                    {...field}
                                    disabled
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Select {...field}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EXPOSANT">
                                            Exposant
                                        </SelectItem>
                                        <SelectItem value="VISITEUR">
                                            Visiteur
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-start justify-start gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>User ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="User ID"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="exposantId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Exposant ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Exposant ID"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-start justify-start gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nom de l'entreprise</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nom de l'entreprise"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="siret"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Siret</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Siret"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-start justify-start gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Postal Code"
                                        {...field}
                                        disabled
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
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="City"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="adresse"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Adresse"
                                        {...field}
                                        disabled
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
