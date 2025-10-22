import { render, screen } from "@testing-library/react";
import { useContext } from "react";

import {
  FormFieldContext,
  type FormFieldContextValue,
  FormItemContext,
  type FormItemContextValue,
} from "@/contexts/formContext";

describe("FormFieldContext", () => {
  it("debe proveer el nombre del campo a los componentes hijos", () => {
    const testValue: FormFieldContextValue = { name: "email" };

    const TestConsumer = () => {
      const context = useContext(FormFieldContext);
      return <div>Field Name: {context.name}</div>;
    };

    render(
      <FormFieldContext.Provider value={testValue}>
        <TestConsumer />
      </FormFieldContext.Provider>
    );

    expect(
      screen.getByText(`Field Name: ${testValue.name}`)
    ).toBeInTheDocument();
  });
});

describe("FormItemContext", () => {
  it("debe proveer el ID del item a los componentes hijos", () => {
    const testValue: FormItemContextValue = { id: "test-form-item-id" };

    const TestConsumer = () => {
      const context = useContext(FormItemContext);
      return <span>Item ID: {context.id}</span>;
    };

    render(
      <FormItemContext.Provider value={testValue}>
        <TestConsumer />
      </FormItemContext.Provider>
    );

    expect(screen.getByText(`Item ID: ${testValue.id}`)).toBeInTheDocument();
  });
});