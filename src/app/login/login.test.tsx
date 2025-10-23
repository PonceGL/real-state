import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/dal";

import LoginPage from "./page";

jest.mock("@/lib/dal", () => ({
  getUser: jest.fn(),
}));

const ADMIN_DASHBOARD = "/dashboard";
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
interface INextRedirectError extends Error {
  digest: string;
  path?: string;
}
const redirectError = new Error(REDIRECT_ERROR_CODE) as INextRedirectError;
redirectError.digest = REDIRECT_ERROR_CODE;

jest.mock("next/navigation", () => ({
  redirect: jest.fn((path: string) => {
    redirectError.path = path;
    throw redirectError;
  }),
}));

const mockedGetUser = getUser as jest.Mock;
const mockedRedirect = redirect as unknown as jest.Mock;

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when user is authenticated", () => {
    const mockUser = { id: "1", email: "admin@test.com" };

    beforeEach(() => {
      mockedGetUser.mockResolvedValue(mockUser);
    });

    it("should call redirect to ADMIN_DASHBOARD", async () => {
      const promise = LoginPage();
      await expect(promise).rejects.toThrow(redirectError);
      expect(mockedRedirect).toHaveBeenCalledWith(ADMIN_DASHBOARD);
      expect(mockedRedirect).toHaveBeenCalledTimes(1);
    });

    it("should not render LoginForm or Logo when redirecting", async () => {
      const promise = LoginPage();
      await expect(promise).rejects.toThrow(redirectError);
      expect(screen.queryByLabelText(/Correo Electrónico/i)).toBeNull();
      expect(screen.queryByTestId("logo-svg")).toBeNull();
    });
  });

  describe("when user is not authenticated", () => {
    beforeEach(() => {
      mockedGetUser.mockResolvedValue(null);
    });

    it("should render LoginForm and Logo", async () => {
      const jsx = await LoginPage();
      render(jsx);
      expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
      expect(screen.getByTestId("logo-svg")).toBeInTheDocument();
    });

    it("should not call redirect", async () => {
      const jsx = await LoginPage();
      render(jsx);
      expect(mockedRedirect).not.toHaveBeenCalled();
    });
  });

  describe("when getUser throws an error", () => {
    beforeEach(() => {
      mockedGetUser.mockRejectedValue(new Error("Database error"));
    });

    it("should render LoginForm and Logo", async () => {
      const jsx = await LoginPage();
      render(jsx);
      expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
      expect(screen.getByTestId("logo-svg")).toBeInTheDocument();
    });

    it("should not call redirect", async () => {
      const jsx = await LoginPage();
      render(jsx);
      expect(mockedRedirect).not.toHaveBeenCalled();
    });
  });
});
