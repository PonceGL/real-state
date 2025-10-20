import { render, screen } from "@testing-library/react";

import DevLayout from "@/app/(dev)/layout";




describe("DevLayout", () => {
  it("debería renderizar a sus hijos (children) correctamente", () => {
    const testId = "test-child";
    const TestChildComponent = <div data-testid={testId}>Hola Mundo</div>;

    render(<DevLayout>{TestChildComponent}</DevLayout>);

    const childElement = screen.getByTestId(testId);

    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hola Mundo");
  });
});
