import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import { LoginForm } from "./index";

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("LoginForm", () => {
  test("renders all form fields and submit button", () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    expect(getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
  });

  test("shows error for short password", async () => {
    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "123" },
    });
    fireEvent.click(getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(
        getByText(/La contraseña debe tener al menos 6 caracteres./i)
      ).toBeInTheDocument();
    });
  });

  test("shows error for long password", async () => {
    const { getByLabelText, getByRole, getByText } = render(
      <LoginForm isInDarkBackground />
    );
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "a".repeat(51) },
    });
    fireEvent.click(getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(
        getByText(/La contraseña no puede tener más de 50 caracteres./i)
      ).toBeInTheDocument();
    });
  });

  // TODO: improve this test
  test("submits form with valid data", async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "securePassword" },
    });
    fireEvent.click(getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith({
        username: "user@example.com",
        password: "securePassword",
      });
    });
  });
});
