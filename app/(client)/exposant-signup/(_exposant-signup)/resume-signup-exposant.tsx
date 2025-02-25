import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    User,
    Mail,
    Building2,
    MapPin,
    Building,
    ShoppingBag,
    History,
    Briefcase,
    MapPinned,
} from "lucide-react";
import HtmlConvertorMdx from '@/components/ui/html-convertor-mdx';

interface FormProps {
    getValues: () => Record<string, string | string[]>;
}

export default function ResumeSignup({ form }: { form: FormProps }) {
    const sections = [
        {
            title: "Informations personnelles",
            fields: [
                { label: "Prénom", key: "firstname", icon: User },
                { label: "Nom", key: "lastName", icon: User },
                { label: "Email", key: "email", icon: Mail },
            ]
        },
        {
            title: "Adresse",
            fields: [
                { label: "Adresse", key: "adresse", icon: MapPinned },
                { label: "Ville", key: "city", icon: Building2 },
                { label: "Code Postal", key: "postalCode", icon: MapPin },
            ]
        },
        {
            title: "Informations professionnelles",
            fields: [
                { label: "Nom de la société", key: "societyName", icon: Building },
                { label: "SIRET", key: "siret", icon: Briefcase },
                { label: "Type", key: "type", icon: User },
            ]
        },
        {
            title: "Description",
            fields: [
                { label: "Produits", key: "products", icon: ShoppingBag },
                { label: "Histoire", key: "history", icon: History },
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Résumé de votre inscription</h2>

            <ScrollArea className="h-[460px] pr-4">
                <div className="space-y-8">
                    {sections.map((section) => (
                        <Card key={section.title}>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                                    {section.title}
                                </h3>
                                <div className="space-y-4">
                                    {section.fields.map((field, fieldIndex) => {
                                        const Icon = field.icon;
                                        const value = form.getValues()[field.key];

                                        return (
                                            <div key={field.key}>
                                                <div className="flex items-center space-x-3">
                                                    <Icon className="size-6 text-gray-400" />
                                                    <div className="flex-1">
                                                        <div className="text-sm font-medium text-gray-500">
                                                            {field.label}
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {field.key === 'type' && Array.isArray(value)
                                                                ? value.map((type: string) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')
                                                                : <HtmlConvertorMdx>{String(value)}</HtmlConvertorMdx>}
                                                        </div>
                                                    </div>
                                                </div>
                                                {fieldIndex < section.fields.length - 1 && (
                                                    <Separator className="my-3" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ScrollArea>
            

        </div>
    );
};