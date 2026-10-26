"use client";

import * as React from "react";
import {
  type FieldPath,
  type FieldValues,
  type Control,
} from "react-hook-form";

import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form/Form";
import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";
import { BsExclamationCircle } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { getNestedError } from "./utils";

interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<"textarea">, "name"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
}

function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  rows = 6,
  className,
  ...props
}: FormTextareaProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = getNestedError(errors, name as unknown as string);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative w-full">
              <Textarea
                rows={rows}
                {...field}
                {...props}
                className={`w-full ${className ?? ""}`.trim()}
                style={{
                  ...(props.style ?? {}),
                  ...(hasError ? { borderColor: "var(--destructive)" } : {}),
                }}
              />
              {hasError && (
                <div
                  className="absolute inset-y-0 flex items-start"
                  style={{ insetInlineEnd: "0.5rem", top: "0.5rem" }}
                >
                  <TooltipWrapper
                    triggerText={
                      <BsExclamationCircle fill="var(--destructive)" />
                    }
                    content={String(hasError.message ?? "")}
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormTextarea };

export default FormTextarea;
