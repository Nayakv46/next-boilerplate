"use client";

import * as React from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

import { Switch } from "@/components/ui/shadcn/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form/Form";
import TooltipWrapper from "@/components/ui/shadcn/TooltipWrapper";
import { BsExclamationCircle } from "react-icons/bs";
import { getNestedError } from "./utils";

interface FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<React.ComponentProps<typeof Switch>, "name"> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: React.ReactNode;
}

function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  ...switchProps
}: FormSwitchProps<TFieldValues, TName>) {
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
          <div className="relative flex items-center justify-between rounded-md border p-3">
            {label || description ? (
              <div className="pr-8">
                {label ? <FormLabel>{label}</FormLabel> : null}
                {description ? (
                  <p className="text-sm text-muted-foreground">{description}</p>
                ) : null}
              </div>
            ) : (
              <span />
            )}
            <FormControl>
              <Switch
                checked={Boolean(field.value)}
                onCheckedChange={field.onChange}
                {...switchProps}
                style={{
                  ...(switchProps as any)?.style,
                  ...(hasError ? { borderColor: "var(--destructive)" } : {}),
                }}
              />
            </FormControl>

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
        </FormItem>
      )}
    />
  );
}

export default FormSwitch;
