"use client";

import * as React from "react";
import {
  type FieldPath,
  type FieldValues,
  type Control,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/Form";
import { Slider } from "@/components/ui/shadcn/slider";
import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";
import { BsExclamationCircle } from "react-icons/bs";
import { getNestedError } from "./utils";

interface FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
  React.ComponentProps<typeof Slider>,
  "name" | "value" | "defaultValue" | "onValueChange" | "onChange"
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  defaultValue?: number;
  showValue?: boolean;
  valueFormatter?: (value: number) => string;
  onChange?: (value: number) => void;
}

function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  defaultValue,
  showValue = true,
  valueFormatter,
  onChange,
  ...sliderProps
}: FormSliderProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = getNestedError(errors, name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const currentValue =
          typeof field.value === "number"
            ? field.value
            : (defaultValue ?? (min as number));
        const formattedValue = valueFormatter
          ? valueFormatter(currentValue)
          : String(currentValue);

        return (
          <FormItem>
            {label && (
              <div className="flex items-center justify-between gap-2">
                <FormLabel>{label}</FormLabel>
                {showValue ? (
                  <span className="text-xs text-muted-foreground">
                    {formattedValue}
                  </span>
                ) : null}
              </div>
            )}
            <FormControl>
              <div
                className={`relative ${disabled ? "cursor-not-allowed" : ""}`}
              >
                <Slider
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  value={[currentValue]}
                  onValueChange={(values) => {
                    field.onChange(values[0]);
                    onChange?.(values[0]);
                  }}
                  onBlur={field.onBlur}
                  className={className}
                  {...sliderProps}
                />

                {hasError && (
                  <div
                    className="absolute inset-y-0 flex items-center"
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
          </FormItem>
        );
      }}
    />
  );
}

export { FormSlider };

export default FormSlider;
