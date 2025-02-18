"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "Le prénom d'utilisateur doit contenir au moins 2 caractères"
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  type: z.enum(["EXPOSANT", "VISITEUR"]),
  number: z.number().min(0, {
    message: "Le nombre doit être un nombre positif",
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
  postalCode: z.string().min(2, {
    message: "Le code postal doit contenir au moins 2 caractères",
  }),
  siret: z.string().min(2, {
    message: "Le siret doit contenir au moins 2 caractères",
  }),
})

export default function ExposantForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastName: "",
      type: "EXPOSANT",
      number: 0,
      email: "",
      adresse: "",
      city: "",
      postalCode: "",
      siret: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const { firstname, lastName, type, number, email, adresse, city, postalCode, siret } = values

    try {
      const response = await ExposantSignupAction({
        firstname: firstname,
        lastName: lastName,
        type: type,
        number: number,
        email: email,
        adresse: adresse,
        city: city,
        postalCode: postalCode,
        siret: siret,
      });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Formulaire soumis avec succès");
        try {
          const sendNotification = await CreateNotificationAction({
            title: "Nouvelle inscription",
            description: `Un nouvel exposant s'est inscrit`,
            url: "/exposants",
          });
          if (sendNotification.status === "error") {
            toast.error(sendNotification.message);
          } else {
            toast.success("Notification envoyée");
          }
        } catch (error) {
          console.error("Notification creation error:", error);
        }
        try {
          const sendMail = await fetch("/api/mail/exposant-signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname,
              lastName,
              email,
              type,
              number,
              adresse,
              city,
              postalCode,
              siret,
            }),
          });
          const data = await sendMail.json();
          if (data.status === "error") {
            toast.error(data.message);
          } else {
            toast.success("Email envoyé");
          }
        } catch (error) {
          console.log(error);
        }
        form.reset();
      }
      
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error(error);
      }
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-full">
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Inscription</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous pour vous inscrire
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
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

              <Button type="submit" className="w-full">
                Soumettre
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}