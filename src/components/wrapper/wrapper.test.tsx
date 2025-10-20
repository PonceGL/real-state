import { render, screen } from "@testing-library/react";

import { Wrapper } from "@/components/wrapper";

describe("Wrapper", () => {
  it("renders children correctly", () => {
    render(
      <Wrapper>
        <span>Test Child</span>
      </Wrapper>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies dark background when isDarkBackground is true", () => {
    render(
      <Wrapper isDarkBackground>
        <span>Dark Mode</span>
      </Wrapper>
    );
    const wrapperDiv = screen.getByText("Dark Mode").closest("div");
    expect(wrapperDiv).toHaveClass("bg-neutral-base-900");
    expect(wrapperDiv).not.toHaveClass("bg-white");
  });

  it("applies white background when isDarkBackground is false or undefined", () => {
    render(
      <Wrapper>
        <span>Light Mode</span>
      </Wrapper>
    );
    const wrapperDiv = screen.getByText("Light Mode").closest("div");
    expect(wrapperDiv).toHaveClass("bg-white");
    expect(wrapperDiv).not.toHaveClass("bg-neutral-base-900");
  });
});
