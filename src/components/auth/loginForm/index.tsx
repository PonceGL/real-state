"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useFormAction } from "@/hooks/useFormAction";
import { logInFormSchema } from "@/lib/auth/definitions";

export function LoginForm() {
  const form = useForm<z.infer<typeof logInFormSchema>>({
    resolver: zodResolver(logInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { execute, isPending, error } = useFormAction({
    action: signup,
    onError: () => {
      form.reset();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
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
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormDescription>This is your secret password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : "Iniciar sesión"}
        </Button>
      </form>
      {error &&!isPending && (
        <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {error}
        </div>
      )}
    </Form>
  );
}
// export function LoginForm() {
