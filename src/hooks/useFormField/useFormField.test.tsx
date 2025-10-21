import { renderHook } from "@testing-library/react";
import React from "react";
import {
  ControllerFieldState,
  FieldError,
  useFormContext,
  useFormState,
} from "react-hook-form";

import { FormFieldContext, FormItemContext } from "@/contexts/formContext";
import { useFormField } from "@/hooks/useFormField";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn(() => {
    return {
      getFieldState: jest.fn(() => ({
        invalid: false,
        isDirty: false,
        error: undefined,
        isValidating: false,
        isTouched: false,
      })),
    };
  }),
  useFormState: jest.fn(() => ({
    defaultValues: { username: "", phone: "", password: "" },
  })),
}));

const mockedUseFormContext = useFormContext as jest.Mock;
const mockedUseFormState = useFormState as jest.Mock;

describe("useFormField", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe lanzar un error si se usa fuera de un FormFieldContext", () => {
    try {
      renderHook(() => useFormField());
    } catch (error) {
      expect(error).toEqual(
        new Error("useFormField should be used within <FormField>")
      );
    }
  });

  it("debe retornar el estado del campo y los IDs generados correctamente", () => {
    const mockName = "email";
    const mockId = "test-id-123";

    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return (
        <FormFieldContext.Provider value={{ name: mockName }}>
          <FormItemContext.Provider value={{ id: mockId }}>
            {children}
          </FormItemContext.Provider>
        </FormFieldContext.Provider>
      );
    };

    const { result } = renderHook(() => useFormField(), { wrapper });

    expect(result.current.id).toBe(mockId);
    expect(result.current.name).toBe(mockName);
    expect(result.current.formItemId).toBe(`${mockId}-form-item`);
    expect(result.current.formDescriptionId).toBe(
      `${mockId}-form-item-description`
    );
    expect(result.current.formMessageId).toBe(`${mockId}-form-item-message`);
    expect(result.current.isDirty).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("debe incluir el objeto de error si el campo es inválido", () => {
    const mockError: FieldError = {
      type: "required",
      message: "Este campo es requerido",
    };
    const mockFieldState: Partial<ControllerFieldState> = {
      invalid: true,
      error: mockError,
    };

    mockedUseFormContext.mockReturnValue({
      getFieldState: () => mockFieldState,
    });
    mockedUseFormState.mockReturnValue({});

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FormFieldContext.Provider value={{ name: "password" }}>
        <FormItemContext.Provider value={{ id: "pw-id-456" }}>
          {children}
        </FormItemContext.Provider>
      </FormFieldContext.Provider>
    );

    const { result } = renderHook(() => useFormField(), { wrapper });

    expect(result.current.invalid).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.error?.message).toBe("Este campo es requerido");
  });
});
