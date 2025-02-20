"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserPlus } from "lucide-react"
import { ExposantSignupAction } from "@/action/(exposant)/action"
import { CreateNotificationAction } from "@/action/(admin)/(notifications)/create/action";
import { toast } from 'sonner';
import ResumeSignup from "./resume-signup-exposant";
import StepBar from "@/components/ui/steps-bar";
import Tiptap from "@/components/rich-editor"

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Le prénom d'utilisateur doit contenir au moins 2 caractères"
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
  postalCode: z.string().min(2, {
    message: "Le code postal doit contenir au moins 2 caractères",
  }).max(5, {
    message: "Le code postal doit contenir 5 caractères",
  }),
  siret: z.string().min(2, {
    message: "Le siret doit contenir au moins 2 caractères",
  }).max(14, {
    message: "Le siret doit contenir 14 caractères",
  }),
  products: z.string().min(2, {
    message: "Le produit doit contenir au moins 2 caractères",
  }),
  history: z.string().min(2, {
    message: "La description de votre histoire doit contenir au moins 2 caractères",
  }),
  societyName: z.string().min(2, {
    message: "Le nom de votre société doit contenir au moins 2 caractères",
  }),
})

export default function ExposantForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastName: "",
      type: "EXPOSANT",
      email: "",
      adresse: "",
      city: "",
      postalCode: "",
      siret: "",
      products: "",
      history: "",
      societyName: "",

    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await ExposantSignupAction(values);
      if (response.status === "error") return toast.error(response.message);

      toast.success("Formulaire soumis avec succès");

      await Promise.all([
        await CreateNotificationAction({
          title: "Nouvelle inscription",
          description: `Un nouvel exposant s'est inscrit`,
          type: "exposant",
        }),
        await fetch("/api/send/exposant-awaiting-validation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }),
      ]);
      toast.success("Email envoyé");
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  const steps = [
    { step: 1, title: "Informations générales" },
    { step: 2, title: "Votre entreprise" },
    { step: 3, title: "Votre produit" },
    { step: 4, title: "Votre histoire" },
    { step: 5, title: "Confirmation" },
  ]

  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = async () => {
    setCurrentStep(currentStep + 1);

  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="mx-auto py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-2 rounded-full">
              <UserPlus className="size-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous pour vous inscrire
              </CardDescription>
            </div>
          </div>

          <StepBar steps={steps} currentStep={currentStep} />

        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
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
                          <Input placeholder="jean.dupont@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Rue de l'Exemple" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code postal</FormLabel>
                          <FormControl>
                            <Input placeholder="75001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  </div>
                  <FormField
                    control={form.control}
                    name="siret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SIRET</FormLabel>
                        <FormControl>
                          <Input placeholder="123 456 789 00012" {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EXPOSANT">Exposant</SelectItem>
                            <SelectItem value="VISITEUR">Visiteur</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="societyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de votre société</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 3 && (
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parlez nous de vos produits</FormLabel>
                      <FormControl className="focus:outline-hidden focus:ring-0">
                        <Tiptap value={field.value} onChange={(value) => field.onChange(value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 4 && (
                <FormField
                  control={form.control}
                  name="history"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parlez nous de votre histoire</FormLabel>
                      <FormControl className="focus:outline-hidden focus:ring-0">
                        <Tiptap value={field.value} onChange={(value) => field.onChange(value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <ResumeSignup form={form} />
                  <Button type="submit" className="w-full">
                    Soumettre
                  </Button>
                </div>
              )}
            </form>
          </Form>
          <div className="flex items-center justify-end gap-2 text-sm py-4">
            {currentStep > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousStep}
              >
                Précédent
              </Button>
            )}
            {currentStep < 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextStep}
              >
                Suivant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div >
  )
}