import { render, screen } from "@testing-library/react";

import { Content } from "./content";

describe("Content component", () => {
  it("renders only text when no icons are provided", () => {
    render(<Content text="Button Text" iconVariant="default" />);
    expect(screen.getByText("Button Text")).toBeInTheDocument();
  });
});
