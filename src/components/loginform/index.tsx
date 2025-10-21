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
import { logInFormSchema } from "@/lib/auth/definitions";

interface LoginFormProps {
  isInDarkBackground?: boolean;
}

export function LoginForm({ isInDarkBackground }: LoginFormProps) {
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof logInFormSchema>) {
    console.log(values); // TODO: improve this function
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-96 p-5 space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel isBackgroundDark={isInDarkBackground}>
                Correo Electrónico
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="tunombre@ejemplo.com"
                  variant={isInDarkBackground ? "inverted" : "default"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel isBackgroundDark={isInDarkBackground}>
                Contraseña
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="********"
                  variant={isInDarkBackground ? "inverted" : "default"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" text="Enviar" />
      </form>
    </Form>
  );
}