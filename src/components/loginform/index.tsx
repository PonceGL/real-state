"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";

const FORM_SCHEMA = z.object({
  username: z.email({
    message: "Ingresa una dirección de correo electrónico válida.",
  }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    })
    .max(100, {
      message: "La contraseña no puede tener más de 100 caracteres.",
    }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FORM_SCHEMA>>({
    resolver: zodResolver(FORM_SCHEMA),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FORM_SCHEMA>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-96 p-5 mx-auto space-y-8 gap-4 border-2 border-neutral-base-600 rounded-lg"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tunombre@ejemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-semantic-error-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage className="text-semantic-error-500" />
            </FormItem>
          )}
        />
        <Button type="submit" text="Enviar" />
      </form>
    </Form>
  );
}