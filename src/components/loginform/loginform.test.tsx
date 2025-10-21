import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { LoginForm } from "./index";

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("LoginForm", () => {
  test("renders all form fields and submit button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
  });

  test("shows error for short password", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/La contraseña debe tener al menos 6 caracteres./i)
      ).toBeInTheDocument();
    });
  });

  test("shows error for long password", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "a".repeat(51) },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(
        screen.getByText(/La contraseña no puede tener más de 50 caracteres./i)
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "securePassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enviar/i }));
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith({ // TODO: improve this test
        username: "user@example.com",
        password: "securePassword",
      });
    });
  });
});