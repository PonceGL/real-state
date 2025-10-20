import { fireEvent, render } from "@testing-library/react";

import { ExampleInput } from "./example";

describe("ExampleInput", () => {
  it("renders all input types", () => {
    const { getByPlaceholderText, getByDisplayValue, getAllByRole, getByTestId } = render(<ExampleInput />);
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByDisplayValue("type text")).toHaveAttribute("readonly");
    expect(getAllByRole("searchbox")[0]).toBeInTheDocument();
    expect(getByPlaceholderText("https://example.com")).toHaveAttribute("type", "url");
    expect(getByTestId("avatar")).toBeInTheDocument();
    expect(getByPlaceholderText("Number")).toHaveAttribute("type", "number");
    expect(getByTestId("appointment")).toBeInTheDocument();
  });

  it("updates email and number values on change", () => {
    const { getByPlaceholderText } = render(<ExampleInput />);
    const emailInput = getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    expect(emailInput).toHaveValue("test@mail.com");

    const numberInput = getByPlaceholderText("Number");
    fireEvent.change(numberInput, { target: { value: "123" } });
    expect(numberInput).toHaveValue(123);
  });

  it("search input updates value", () => {
    const { getAllByRole } = render(<ExampleInput />);
    const searchInput = getAllByRole("searchbox")[0];
    fireEvent.change(searchInput, { target: { value: "query" } });
    expect(searchInput).toHaveValue("query");
  });

  it("file input accepts correct file types", () => {
    const { getByTestId } = render(<ExampleInput />);
    const fileInput = getByTestId("avatar");
    expect(fileInput).toHaveAttribute("accept", "image/png, image/jpeg");
  });

  it("time input has min, max, and required attributes", () => {
    const { getByTestId } = render(<ExampleInput />);
    const timeInput = getByTestId("appointment");
    expect(timeInput).toHaveAttribute("min", "09:00");
    expect(timeInput).toHaveAttribute("max", "18:00");
    expect(timeInput).toBeRequired();
  });

  it("text input is readOnly", () => {
    const { getByDisplayValue } = render(<ExampleInput />);
    const textInput = getByDisplayValue("type text");
    expect(textInput).toHaveAttribute("readonly");
  });
});
