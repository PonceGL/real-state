import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { redirect } from "next/navigation";
import React from "react";

import { getUser } from "@/lib/dal";

import AdminLayout from "./layout";

jest.mock("@/lib/dal", () => ({
  getUser: jest.fn(),
}));

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

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return <a href={href}>{children}</a>;
  };

  MockLink.displayName = "MockNextLink";

  return MockLink;
});

const mockedGetUser = getUser as jest.Mock;
const mockedRedirect = redirect as unknown as jest.Mock;

const MockChildComponent = () => <div>Mock Child Content</div>;

type AdminLayoutProps = React.ComponentProps<typeof AdminLayout>;

describe("AdminLayout", () => {
  let props: AdminLayoutProps;

  beforeEach(() => {
    jest.clearAllMocks();

    props = {
      children: <MockChildComponent />,
    };
  });

  describe("when user is authenticated", () => {
    const mockUser = { id: "1", email: "admin@test.com" };

    beforeEach(() => {
      mockedGetUser.mockResolvedValue(mockUser);
    });

    it("should render the layout, header, and children", async () => {
      const jsx = await AdminLayout(props);

      render(jsx);

      expect(screen.getByText("Admin Home")).toBeInTheDocument();
      expect(screen.getByText("Mock Child Content")).toBeInTheDocument();
    });

    it("should NOT call redirect", async () => {
      const jsx = await AdminLayout(props);
      render(jsx);

      expect(mockedRedirect).not.toHaveBeenCalled();
    });
  });

  describe("when user is NOT authenticated", () => {
    it("should call redirect to '/' if getUser returns null", async () => {
      mockedGetUser.mockResolvedValue(null);

      const promise = AdminLayout(props);

      await expect(promise).rejects.toThrow(redirectError);

      expect(mockedRedirect).toHaveBeenCalledWith("/");
      expect(mockedRedirect).toHaveBeenCalledTimes(1);
    });

    it("should call redirect to '/' if getUser throws an error", async () => {
      mockedGetUser.mockRejectedValue(new Error("Database connection failed"));

      const promise = AdminLayout(props);

      await expect(promise).rejects.toThrow(redirectError);

      expect(mockedRedirect).toHaveBeenCalledWith("/");
      expect(mockedRedirect).toHaveBeenCalledTimes(1);
    });

    it("should not render layout or children when redirecting", async () => {
      mockedGetUser.mockResolvedValue(null);

      const promise = AdminLayout(props);

      await expect(promise).rejects.toThrow(redirectError);

      expect(screen.queryByText("Admin Home")).not.toBeInTheDocument();
      expect(screen.queryByText("Mock Child Content")).not.toBeInTheDocument();
    });
  });
});
