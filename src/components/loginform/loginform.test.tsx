import { fireEvent, render, waitFor } from "@testing-library/react";

import { login } from "@/actions/auth";

import { LoginForm } from "./index";

jest.mock("@/actions/auth", () => ({
  login: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

describe("LoginForm", () => {
  test("renders all form fields and submit button", () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    expect(getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  test("shows error for short password", async () => {
    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "123" },
    });
    fireEvent.click(getByRole("button", { name: /Entrar/i }));
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
    fireEvent.click(getByRole("button", { name: /Entrar/i }));
    await waitFor(() => {
      expect(
        getByText(/La contraseña no puede tener más de 50 caracteres./i)
      ).toBeInTheDocument();
    });
  });

  test("submits form with invalid data", async () => {
    (login as jest.Mock).mockReturnValue({
      error: "Ocurrió un error intente más tarde",
    });
    const { getByLabelText, getByRole, getByText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "securePassword" },
    });
    fireEvent.click(getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(
        getByText(/Ocurrió un error intente más tarde/i)
      ).toBeInTheDocument();
    });
  });

  test("submits form with valid data", async () => {
    (login as jest.Mock).mockReturnValue({
      error: null,
    });
    const { getByLabelText, getByRole, queryByText } = render(<LoginForm />);
    fireEvent.change(getByLabelText(/Correo Electrónico/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(getByLabelText(/Contraseña/i), {
      target: { value: "securePassword" },
    });
    fireEvent.click(getByRole("button", { name: /Entrar/i }));

    await waitFor(() => {
      expect(queryByText(/Ocurrió un error intente más tarde/i)).toBeNull();
    });
  });
});
