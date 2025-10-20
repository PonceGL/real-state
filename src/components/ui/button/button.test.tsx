import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { Button } from "./index";

jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("Button Component", () => {
  it("should render a default button correctly", () => {
    render(<Button text="Click Me" />);

    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();

    expect(buttonElement).toHaveClass("bg-brand-primary-500");
    expect(buttonElement).toHaveClass("w-full");
  });

  it("should render as a link when the link prop is provided", () => {
    const linkPath = "/about";
    render(<Button text="Go to About" link={linkPath} />);

    const linkElement = screen.getByRole("link", { name: /go to about/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", linkPath);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should call the onClick handler when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button text="Submit" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled and not call onClick when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(<Button text="Disabled Button" disabled onClick={handleClick} />);

    const buttonElement = screen.getByRole("button", {
      name: /disabled button/i,
    });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass("opacity-50", "cursor-not-allowed");

    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should apply variant and size classes correctly", () => {
    render(<Button text="Danger Button" variant="danger" size="fit" />);

    const buttonElement = screen.getByRole("button", {
      name: /danger button/i,
    });

    expect(buttonElement).toHaveClass("bg-semantic-error-500");
    expect(buttonElement).toHaveClass("w-fit");

    expect(buttonElement).not.toHaveClass("w-full");
  });

  it("should not have button-specific props when rendered as a link", () => {
    render(<Button text="Link Button" link="/" type="submit" disabled />);
    const linkElement = screen.getByRole("link", { name: /link button/i });
    expect(linkElement).not.toHaveAttribute("type");
    expect(linkElement).not.toHaveAttribute("disabled");
  });
});
