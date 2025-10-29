import { fireEvent, render } from "@testing-library/react";

import { ExampleButton } from "@/components/ui/button/example";

describe("ExampleButton", () => {
  it("calls printVariant on button click", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const defaultBtn = queryAllByText("default")[0];

    fireEvent.click(defaultBtn);
    expect(defaultBtn).toBeInTheDocument();
  });

  it("calls printVariant on button fit click", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const defaultBtn = queryAllByText("default fit")[0];
    fireEvent.click(defaultBtn);
    expect(defaultBtn).toBeInTheDocument();
  });

  it("renders link button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("Is Link")[0];
    expect(button).toBeInTheDocument();
  });

  it("renders outline button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("outline")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders inverted button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("inverted")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders outlineInverted button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("outlineInverted")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders whatsapp button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("whatsapp")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders warning button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("warning")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it("renders danger button", () => {
    const { queryAllByText } = render(<ExampleButton />);
    const button = queryAllByText("danger")[0];
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
