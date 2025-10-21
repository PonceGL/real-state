import { fireEvent, render, screen } from "@testing-library/react";

import { Input } from "@/components/ui";



describe("Input Component", () => {
  it("should render a default input element", () => {
    render(<Input data-testid="default-input" />);

    const inputElement = screen.getByTestId("default-input");
    expect(inputElement).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should apply default variant and size classes", () => {
    render(<Input placeholder="Default input" />);
    const inputElement = screen.getByPlaceholderText("Default input");

    expect(inputElement).toHaveClass("border-neutral-base-600");

    expect(inputElement).toHaveClass("w-full");
  });

  it("should apply custom variant and size classes correctly", () => {
    render(<Input placeholder="Custom input" variant="danger" size="fit" />);
    const inputElement = screen.getByPlaceholderText("Custom input");

    expect(inputElement).toHaveClass("bg-semantic-error-500");

    expect(inputElement).toHaveClass("w-fit");

    expect(inputElement).not.toHaveClass("w-full");
  });

  it("should forward native input props like type, value, and placeholder", () => {
    const testValue = "test@example.com";
    render(
      <Input
        type="email"
        placeholder="Enter your email"
        value={testValue}
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter your email");
    expect(inputElement).toHaveAttribute("type", "email");
    expect(inputElement).toHaveValue(testValue);
  });

  it("should call the onChange handler when the user types", () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText("Type here");
    fireEvent.change(inputElement, { target: { value: "hello" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when the disabled prop is true", () => {
    render(<Input placeholder="Disabled" disabled />);

    const inputElement = screen.getByPlaceholderText("Disabled");
    expect(inputElement).toBeDisabled();
  });

  it("should accept and render other html attributes like name and id", () => {
    render(<Input name="username" id="user-id" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveAttribute("name", "username");
    expect(inputElement).toHaveAttribute("id", "user-id");
  });
});