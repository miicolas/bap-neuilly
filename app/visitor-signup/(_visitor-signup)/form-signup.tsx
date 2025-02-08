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
import { toast } from 'sonner';

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
});

export default function EventForm() {

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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {


    const { firstName, lastName, email, gender, age, city, person } = values;

    try {
      const response = await VisitorSignupAction({
        firstname: firstName,
        lastname: lastName,
        email: email,
        gender: gender,
        age: age,
        city: city,
        person: person,
      });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Formulaire soumis avec succès");
        try {
          const response = await fetch('/api/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
            }),

          });
          const data = await response.json();
          if (data.status === "error") {
            toast.error(data.message);
          } else {
            toast.success('Email envoyé avec succès');
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

        {/* Premier groupe - Prénom/Nom */}
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

        {/* Email */}
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

        {/* Deuxième groupe - Genre/Âge/Nombre de personnes */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez un genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">Homme</SelectItem>
                    <SelectItem value="FEMALE">Femme</SelectItem>
                    <SelectItem value="OTHER">Autre</SelectItem>
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ville */}
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



        {/* Bouton de soumission */}
        <Button type="submit" className="w-full" >
          Soumettre
        </Button>
      </form>
    </Form>
  );
}
