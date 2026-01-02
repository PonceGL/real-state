import { render, screen } from "@testing-library/react";

import { KeyInfo , type  KeyInfoProps } from "@/components/ui/keyInfo";

jest.mock("@/components/ui/icon", () => ({
  Icon: jest.fn(({ name }) => <span data-testid={`icon-${name}`}>{name}</span>),
}));

describe("KeyInfo Component", () => {
  
  it("should render the value and label correctly without an icon", () => {
    const props: KeyInfoProps = {
      label: "Recámaras",
      value: 3,
    };

    render(<KeyInfo {...props} />);

    const labelElement = screen.getByText("Recámaras");
    expect(labelElement).toBeInTheDocument();
    
    const valueElement = screen.getByText("3 M²");
    expect(valueElement).toBeInTheDocument();

    const iconElement = screen.queryByTestId("icon-SquareIcon");
    expect(iconElement).not.toBeInTheDocument();
  });

  it("should render the icon when iconName prop is provided", () => {
    const props: KeyInfoProps = {
      label: "Terreno",
      value: 180,
      iconName: "SquareIcon",
    };

    render(<KeyInfo {...props} />);

    const iconElement = screen.getByTestId("icon-SquareIcon");
    expect(iconElement).toBeInTheDocument();
  });

  it("should display the label and value with their specific text styles", () => {
    const props: KeyInfoProps = {
      label: "Pisos",
      value: 2,
    };

    render(<KeyInfo {...props} />);

    const labelElement = screen.getByText("Pisos");
    expect(labelElement).toHaveClass("text-xl text-neutral-base-400"); 

    const valueElement = screen.getByText("2 M²");
    expect(valueElement).toHaveClass("text-xl font-bold text-black");
  });
  
  it("should handle a large value correctly", () => {
    const props: KeyInfoProps = {
      label: "Precio Estimado",
      value: 1500000,
    };

    render(<KeyInfo {...props} />);

    const valueElement = screen.getByText("1500000 M²");
    expect(valueElement).toBeInTheDocument();
  });
});