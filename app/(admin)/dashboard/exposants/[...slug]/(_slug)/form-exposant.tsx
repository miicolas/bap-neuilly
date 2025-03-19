"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UpdateExposantAction } from "@/action/(admin)/(exposant)/update/action";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TagInput } from "@/components/ui/tag";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    User,
    Building2,
    FileText,
    MapPin,
    Tags,
    Save,
    ClipboardList,
    Briefcase,
    Mail,
    History,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Exposant as ExposantType } from "@/lib/type";
import RichTextEditor from "@/components/rich-editor";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Le prénom d'utilisateur doit contenir au moins 2 caractères",
    }),
    lastName: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }),
    type: z.array(z.string()).min(1, {
        message: "Veuillez sélectionner au moins un type",
    }),
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
    exposantId: z.string(),
});

// Fonction pour obtenir la classe de couleur selon le statut
const getStatusColor = (status: string) => {
    switch (status) {
        case "accepted":
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        case "refused":
            return "bg-red-100 text-red-800 border-red-200";
        case "pending":
            return "bg-amber-100 text-amber-800 border-amber-200";
        default:
            return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
};

// Fonction pour obtenir le libellé français du statut
const getStatusLabel = (status: string) => {
    switch (status) {
        case "accepted":
            return "Accepté";
        case "refused":
            return "Refusé";
        case "pending":
            return "En attente";
        default:
            return status;
    }
};

export default function FormExposant({ exposant }: { exposant: ExposantType }) {
    const types = exposant.type.split(",");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: exposant.firstName,
            lastName: exposant.lastName,
            email: exposant.email,
            type: types,
            adresse: exposant.adresse,
            city: exposant.city,
            postalCode: exposant.postalCode,
            siret: exposant.siret,
            products: exposant.products,
            history: exposant.history,
            companyName: exposant.companyName,
            status: exposant.status as "pending" | "accepted" | "refused",
            userId: exposant.userId || "",
            exposantId: exposant.exposantId || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!exposant.id) {
                toast.error("Exposant not found");
                return;
            }

            const {
                firstName,
                lastName,
                email,
                type,
                adresse,
                city,
                postalCode,
                siret,
                products,
                history,
                companyName,
                status,
                userId,
                exposantId,
            } = values;

            const updateExposant = await UpdateExposantAction({
                id: exposant.id,
                data: {
                    firstName,
                    lastName,
                    email,
                    type: type.join(", "),
                    adresse,
                    city,
                    postalCode,
                    siret,
                    products,
                    history,
                    companyName,
                    status: status as "pending" | "accepted" | "refused",
                    userId,
                    exposantId,
                },
            });

            if (updateExposant.status === "success") {
                toast.success(updateExposant.message);
            } else {
                toast.error(updateExposant.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Une erreur est survenue lors de la mise à jour");
        }
    }

    return (
        <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-6">
                {/* En-tête du formulaire */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-violet-600" />
                        {exposant.companyName}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge
                            variant="outline"
                            className={cn(
                                "px-2.5 py-0.5",
                                getStatusColor(exposant.status)
                            )}
                        >
                            {getStatusLabel(exposant.status)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                            ID: {exposant.exposantId}
                        </span>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Informations personnelles */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3 bg-neutral-50">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    Informations personnelles
                                </CardTitle>
                                <CardDescription>
                                    Coordonnées de l'exposant
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prénom</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Prénom"
                                                        {...field}
                                                        disabled
                                                        className="bg-neutral-50"
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
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nom"
                                                        {...field}
                                                        disabled
                                                        className="bg-neutral-50"
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
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Email"
                                                        {...field}
                                                        disabled
                                                        className="pl-10 bg-neutral-50"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Informations de l'entreprise */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3 bg-neutral-50">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-violet-600" />
                                    Informations de l'entreprise
                                </CardTitle>
                                <CardDescription>
                                    Détails concernant l'entreprise exposante
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nom de l'entreprise
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nom de l'entreprise"
                                                        {...field}
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
                                            <FormItem>
                                                <FormLabel>Siret</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Siret"
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
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Tags className="h-4 w-4 text-muted-foreground" />
                                                Type d'activité
                                            </FormLabel>
                                            <FormControl>
                                                <TagInput
                                                    value={field.value}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    placeholder="Ajouter un type d'activité"
                                                    className="py-5"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-xs">
                                                Séparez les types d'activité par
                                                une virgule ou appuyez sur
                                                Entrée
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Adresse */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3 bg-neutral-50">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-600" />
                                    Adresse
                                </CardTitle>
                                <CardDescription>
                                    Localisation de l'entreprise
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="postalCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Code postal
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Code postal"
                                                        {...field}
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
                                                    <Input
                                                        placeholder="Ville"
                                                        {...field}
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
                                            <FormItem className="md:col-span-3">
                                                <FormLabel>
                                                    Adresse complète
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Adresse"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Informations techniques */}
                        <Card className="shadow-sm col-span-2">
                            <CardHeader className="pb-3 bg-neutral-50">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ClipboardList className="h-5 w-5 text-amber-600" />
                                    Identifiants techniques
                                </CardTitle>
                                <CardDescription>
                                    Identifiants système (lecture seule)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="userId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="User ID"
                                                        {...field}
                                                        disabled
                                                        className="font-mono text-sm bg-neutral-50"
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
                                            <FormItem>
                                                <FormLabel>
                                                    Exposant ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Exposant ID"
                                                        {...field}
                                                        disabled
                                                        className="font-mono text-sm bg-neutral-50"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contenus descriptifs */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3 bg-neutral-50">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    Contenus descriptifs
                                </CardTitle>
                                <CardDescription>
                                    Description des produits et de l'histoire de
                                    l'entreprise
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-5 space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="products"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 mb-2">
                                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                    Produits
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="border rounded-md p-1">
                                                        <RichTextEditor
                                                            value={field.value}
                                                            onChange={(value) =>
                                                                field.onChange(
                                                                    value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="history"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 mb-2">
                                                    <History className="h-4 w-4 text-muted-foreground" />
                                                    Histoire de l'entreprise
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="border rounded-md p-1">
                                                        <RichTextEditor
                                                            value={field.value}
                                                            onChange={(value) =>
                                                                field.onChange(
                                                                    value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="flex items-center justify-end space-x-4 sticky bottom-0 bg-white p-4 border-t border-neutral-200 -mx-6 -mb-6 mt-10">
                            <Button
                                type="submit"
                                className="flex items-center gap-2 px-5 bg-violet-600 hover:bg-violet-700"
                            >
                                <Save className="h-4 w-4" />
                                Enregistrer les modifications
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ScrollArea>
    );
}
