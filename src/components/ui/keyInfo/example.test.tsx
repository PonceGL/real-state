
import { render, screen } from "@testing-library/react";

import { ExampleKeyInfo } from "@/components/ui/keyInfo/example";
jest.mock("@/components/ui/keyInfo", () => ({
  KeyInfo: jest.fn(({ label, value, iconName }) => (
   
    <div data-testid="key-info-item" data-label={label} data-value={value}>
      <span>{label}</span>
      <span>{value}</span>
      <i data-testid={`icon-${iconName}`}>{iconName}</i>
    </div>
  )),
  KeyInfoProps: {},
}));


describe("ExampleKeyInfo Component", () => {
  
  const KEY_INFO_PROPS_COUNT = 4;
  
  
  const FIRST_VALUE = 220;
  const LAST_LABEL = "Baños";

  it("should render the correct number of KeyInfo components (4 total)", () => {
    render(<ExampleKeyInfo />);

    
    const keyInfoElements = screen.getAllByTestId("key-info-item");
    expect(keyInfoElements).toHaveLength(KEY_INFO_PROPS_COUNT);
  });

  it("should pass the correct props to the first and last KeyInfo item", () => {
    render(<ExampleKeyInfo />);

    
    expect(screen.getByText("Terreno")).toBeInTheDocument();
    expect(screen.getByText(String(FIRST_VALUE))).toBeInTheDocument();
    expect(screen.getByTestId("icon-SquareIcon")).toBeInTheDocument();


    
    expect(screen.getByText(LAST_LABEL)).toBeInTheDocument();
    
    const lastKeyInfo = screen.getByText(LAST_LABEL).closest("[data-testid=\"key-info-item\"]");
    
    
    expect(lastKeyInfo).toHaveAttribute("data-label", LAST_LABEL);
    expect(lastKeyInfo).toHaveAttribute("data-value", "185");
    expect(screen.getAllByTestId("icon-BuildingIcon")[1]).toBeInTheDocument();
  });

  it("should render the container with the correct grid layout for the list", () => {
    render(<ExampleKeyInfo />);

    
    const container = screen.getAllByTestId("key-info-item")[3].parentElement;
    expect(container).toHaveClass("grid grid-cols-4 gap-4");
  });
});