"use client";

import { CalendarIcon } from "lucide-react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/Form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";

import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";

import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";

import { BsExclamationCircle } from "react-icons/bs";

import { format } from "date-fns";
import { pl } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { getNestedError } from "./utils";

type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (date: Date | undefined) => void;
  fromDate?: Date;
};

function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  placeholder = "Select date",
  className,
  disabled,
  onChange,
  fromDate,
}: FormDatePickerProps<TFieldValues, TName>) {
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = getNestedError(errors, name as unknown as string);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className={label ? "" : "sr-only"}>
            {label ?? placeholder}
          </FormLabel>

          <FormControl>
            <div className="relative">
              <Popover>
                <PopoverTrigger>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                      "min-w-40 justify-between text-left font-normal",
                      !field.value && "text-muted-foreground",
                      className,
                    )}
                    style={
                      hasError ? { borderColor: "var(--destructive)" } : {}
                    }
                  >
                    {field.value ? (
                      format(new Date(field.value), "dd.MM.yyyy", {
                        locale: pl,
                      })
                    ) : (
                      <span>{placeholder}</span>
                    )}

                    <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="min-w-[var(--radix-popover-trigger-width)] p-0"
                  align="start"
                >
                  <Calendar
                    className="w-full"
                    mode="single"
                    disabled={
                      fromDate
                        ? {
                            before: fromDate,
                          }
                        : undefined
                    }
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date);
                      onChange?.(date);
                    }}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>

              {hasError && (
                <div
                  className="absolute inset-y-0 flex items-center"
                  style={{ insetInlineEnd: "2.5rem" }}
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

export default FormDatePicker;
