"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, useId } from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { FormFieldContext, FormItemContext } from "@/contexts/formContext";
import { useFormField } from "@/hooks/useFormField";
import { cn } from "@/lib/styles/utils";

type IsBackgroundDark = {
  isBackgroundDark?: boolean;
};

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormLabel({
  isBackgroundDark,
  ...props
}: Omit<ComponentProps<typeof LabelPrimitive.Root>, "className"> &
  IsBackgroundDark) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-semantic-error-500",
        `${
          isBackgroundDark ? "text-neutral-base-200" : "text-neutral-base-900"
        }`
      )}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({
  isBackgroundDark,
  ...props
}: Omit<ComponentProps<"p">, "className"> & IsBackgroundDark) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={`${
        isBackgroundDark ? "text-neutral-base-200" : "text-neutral-base-900"
      } text-sm`}
      {...props}
    />
  );
}

function FormMessage({
  isBackgroundDark,
  ...props
}: Omit<ComponentProps<"p">, "className"> & IsBackgroundDark) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-semantic-error-500",
        `${
          isBackgroundDark ? "text-neutral-base-200" : "text-neutral-base-900"
        }`
      )}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
