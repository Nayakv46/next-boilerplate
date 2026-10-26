"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form/Form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";
import { BsExclamationCircle } from "react-icons/bs";
import { getNestedError } from "./utils";

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  options: Option[];
  label?: string;
  placeholder?: string;
  size?: "sm" | "default";
  className?: string;
  onChange?: (value: string) => void;
};

function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  options,
  label,
  placeholder = "Select",
  size = "default",
  className,
  onChange,
}: FormSelectProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = useFormContext();
  const hasError = getNestedError(errors, name as unknown as string);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={label ? "" : "sr-only"}>
            {label ?? placeholder}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  if (!value) return;
                  field.onChange(value);
                  onChange?.(value);
                }}
              >
                <SelectTrigger
                  className={`min-w-40 ${className}`}
                  size={size}
                  style={hasError ? { borderColor: "var(--destructive)" } : {}}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((opt) => (
                      <SelectItem value={opt.value} key={opt.value}>
                        {opt.icon ? (
                          <span className="mr-2">{opt.icon}</span>
                        ) : null}
                        <span>{opt.label}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {hasError && (
                <div
                  className="absolute inset-y-0 flex items-center"
                  style={{ insetInlineEnd: "2rem" }}
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
      )}
    />
  );
}

export default FormSelect;
