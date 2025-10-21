import { render, screen } from "@testing-library/react";

import { Label } from ".";

describe("Label component", () => {
  it("renders with default styles", () => {
    render(<Label>Default Label</Label>);
    const label = screen.getByText("Default Label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("flex items-center gap-2 text-sm leading-none font-medium select-none");
  });

  it("applies custom className", () => {
    render(<Label className="custom-class">Custom Label</Label>);
    const label = screen.getByText("Custom Label");
    expect(label).toHaveClass("custom-class");
  });

  it("forwards additional props", () => {
    render(<Label data-testid="label-test">Test Label</Label>);
    const label = screen.getByTestId("label-test");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Test Label");
  });

  it("renders as disabled when peer-disabled is true", () => {
    render(
      <Label className="peer-disabled">Disabled Label</Label>
    );
    const label = screen.getByText("Disabled Label");
    expect(label).toHaveClass("peer-disabled:cursor-not-allowed peer-disabled:opacity-50");
  });

  it("renders with group-data disabled styles", () => {
    render(
      <Label className="group-data-[disabled=true]">Group Disabled Label</Label>
    );
    const label = screen.getByText("Group Disabled Label");
    expect(label).toHaveClass("group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50");
  });
});
