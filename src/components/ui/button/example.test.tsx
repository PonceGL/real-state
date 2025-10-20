import { fireEvent, render, screen } from "@testing-library/react";

import { ExampleButton } from "./example";

describe("ExampleButton", () => {
  it("renders all button variants", () => {
    render(<ExampleButton />);
  expect(screen.getAllByText("Click me").length).toBe(2);
    expect(screen.getByText("outline")).toBeInTheDocument();
    expect(screen.getByText("inverted")).toBeInTheDocument();
    expect(screen.getByText("outlineInverted")).toBeInTheDocument();
    expect(screen.getByText("whatsapp")).toBeInTheDocument();
    expect(screen.getByText("warning")).toBeInTheDocument();
    expect(screen.getByText("danger")).toBeInTheDocument();
  });

  it("calls printVariant on button click", () => {
    render(<ExampleButton />);
    const defaultBtn = screen.getAllByText("Click me")[0];
  fireEvent.click(defaultBtn);
  });

  it("renders link button", () => {
    render(<ExampleButton />);
    const linkBtn = screen.getByText("Is Link");
    expect(linkBtn).toBeInTheDocument();
  });
});
