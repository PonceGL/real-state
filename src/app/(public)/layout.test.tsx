import { render, screen } from "@testing-library/react";

import PublicLayout from "@/app/(public)/layout";



describe("PublicLayout", () => {
  it("debería renderizar a sus hijos (children) correctamente", () => {
    const testId = "test-child";
    const TestChildComponent = <div data-testid={testId}>Hola Mundo</div>;

    render(<PublicLayout>{TestChildComponent}</PublicLayout>);

    const childElement = screen.getByTestId(testId);

    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent("Hola Mundo");
  });
});
