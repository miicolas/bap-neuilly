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
import { toast } from "sonner";
import { AddAdminAction } from "@/action/(admin)/add/action";

const formSchema = z.object({
    adminName: z.string().min(2, {
        message: "Le nom de l'événement doit contenir au moins 2 caractères",
    }),
    adminEmail: z.string().email({
        message: "L'email doit être une adresse email valide",
    }),
});

export default function AdminForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adminName: "",
            adminEmail: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { adminName, adminEmail } = values;

            const response = await AddAdminAction({
                adminName,
                adminEmail,
            });

            if (response.status === "error") {
                return toast.error(response.message);
            }

            toast.success("Administrateur ajouté avec succès");
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
                        name="adminName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Nom de l'administrateur</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nom de l'administrateur"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="adminEmail"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email de l'administrateur</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Ajouter un administrateur
                </Button>
            </form>
        </Form>
    );
}
