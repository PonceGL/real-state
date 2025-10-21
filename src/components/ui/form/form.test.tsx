import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";

const MockInput = (props: React.ComponentProps<"input">) => (
  <input {...props} />
);
const MockButton = (props: React.ComponentProps<"button">) => (
  <button {...props} />
);

const testSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El correo es obligatorio." })
    .email({ message: "Debe ser un correo electrónico válido." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
});

type TestFormValues = z.infer<typeof testSchema>;

const TestFormContainer = ({
  onSubmit,
}: {
  onSubmit: (values: TestFormValues) => void;
}) => {
  const form = useForm<TestFormValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormDescription>Nunca compartiremos tu correo.</FormDescription>
              <FormControl>
                <MockInput placeholder="test@example.com" {...field} />
              </FormControl>
              <FormMessage>
                <p>Obligatorio</p>
              </FormMessage>
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
                <MockInput type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MockButton type="submit">Enviar</MockButton>
      </form>
    </Form>
  );
};

describe("Form Components Integration", () => {
  it("should display validation errors when submitting with empty fields", async () => {
    const onSubmitMock = jest.fn();
    const { getByRole, findByText, debug } = render(
      <TestFormContainer onSubmit={onSubmitMock} />
    );
    expect(await findByText("Obligatorio")).toBeInTheDocument();

    fireEvent.click(getByRole("button", { name: /enviar/i }));

    expect(await findByText("El correo es obligatorio.")).toBeInTheDocument();
    expect(
      await findByText("La contraseña debe tener al menos 6 caracteres.")
    ).toBeInTheDocument();
    debug();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should display a format error for an invalid email", async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, getByRole, findByText, getByText, queryByText } =
      render(<TestFormContainer onSubmit={onSubmitMock} />);

    fireEvent.change(getByLabelText(/correo electrónico/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(getByLabelText(/contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(getByRole("button", { name: /enviar/i }));

    const errorMessage = await findByText(
      "Debe ser un correo electrónico válido."
    );
    const description = getByText("Nunca compartiremos tu correo.");
    const input = getByLabelText(/correo electrónico/i);

    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toContain(description.id);
    expect(describedBy).toContain(errorMessage.id);

    expect(
      queryByText("La contraseña debe tener al menos 6 caracteres.")
    ).not.toBeInTheDocument();
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("should call onSubmit with the correct data when the form is valid", async () => {
    const onSubmitMock = jest.fn();
    const testData = {
      email: "test@example.com",
      password: "validpassword",
    };
    const { getByLabelText, getByRole, getByText } = render(
      <TestFormContainer onSubmit={onSubmitMock} />
    );

    fireEvent.change(getByLabelText(/correo electrónico/i), {
      target: { value: testData.email },
    });
    fireEvent.change(getByLabelText(/contraseña/i), {
      target: { value: testData.password },
    });
    fireEvent.click(getByRole("button", { name: /enviar/i }));

    const description = getByText("Nunca compartiremos tu correo.");
    const input = getByLabelText(/correo electrónico/i);
    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-describedby", description.id);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
    });
    expect(onSubmitMock).toHaveBeenCalledWith(testData, expect.anything());
  });
});