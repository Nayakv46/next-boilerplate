"use client";

import * as React from "react";
import {
  type FieldPath,
  type FieldValues,
  type Control,
  useFormContext,
} from "react-hook-form";

import { Input } from "@/components/ui/shadcn/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form/Form";
import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";
import { BsExclamationCircle } from "react-icons/bs";
import { getNestedError } from "./utils";

interface FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<"input">, "name"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  // description?: string;
}

function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  // description,
  type = "text",
  ...inputProps
}: FormTextInputProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = getNestedError(errors, name);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div
                className={`relative ${inputProps.disabled ? "cursor-not-allowed" : ""}`}
              >
                <Input
                  type={type}
                  {...field}
                  {...inputProps}
                  // ensure input has extra space on the inline end so text doesn't flow under the icon
                  style={{
                    ...(inputProps as any)?.style,
                    paddingInlineEnd:
                      (inputProps as any)?.style?.paddingInlineEnd ?? "2.25rem",
                    ...(hasError && { borderColor: "var(--destructive)" }),
                  }}
                  className={`min-w-40  ${inputProps.className || ""}`}
                />
                {hasError && (
                  <div
                    className="absolute inset-y-0 flex items-center"
                    // place at the logical inline end (right in LTR, left in RTL)
                    style={{ insetInlineEnd: "0.5rem" }}
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
            {/* {description && <FormDescription>{description}</FormDescription>} */}
            {/* <FormMessage /> */}
          </FormItem>
        );
      }}
    />
  );
}

export { FormTextInput };
