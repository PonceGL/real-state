import { fireEvent, render } from "@testing-library/react";

import { ExampleButton } from "@/components/ui/button/example";

describe("ExampleButton", () => {
  it("calls printVariant on button click", () => {
    const { getByText } = render(<ExampleButton />);
    const defaultBtn = getByText("default");
    fireEvent.click(defaultBtn);
    expect(defaultBtn).toBeInTheDocument();
  });

  it("calls printVariant on button fit click", () => {
    const { getByText } = render(<ExampleButton />);
    const defaultBtn = getByText("default fit");
    fireEvent.click(defaultBtn);
    expect(defaultBtn).toBeInTheDocument();
  });

  it("renders link button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("Is Link");
    expect(button).toBeInTheDocument();
  });

  it("renders outline button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("outline");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders inverted button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("inverted");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders outlineInverted button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("outlineInverted");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders whatsapp button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("whatsapp");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders warning button", () => {
    const { getByText } = render(<ExampleButton />);
    const button = getByText("warning");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders danger button", () => {
    const { getByText, debug } = render(<ExampleButton />);
    debug();
    const button = getByText("danger");
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
