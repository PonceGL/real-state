"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

import { login } from "@/actions/auth";
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
import { FORGOT_PASSWORD } from "@/constants/routes";
import { useFormAction } from "@/hooks/useFormAction";
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

  const { execute, isPending, error } = useFormAction({
    action: login,
    onError: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className="w-full max-w-96 space-y-8"
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
                  autoComplete="off"
                  autoCorrect="off"
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
                  autoComplete="off"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="w-full text-right">
                <Link
                  href={FORGOT_PASSWORD}
                  className="text-sm text-blue-600 transition-all duration-300 hover:underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" text="Entrar" disabled={isPending} />
      </form>
      {error &&
        !isPending && ( // TODO: Mejorar la forma de mostrar errores
          <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
            {error}
          </div>
        )}
    </Form>
  );
}
