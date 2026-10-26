"use client";

import React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../shadcn/input-otp";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form/Form";

type FormInputOTPProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  length?: number;
};

function FormInputOTP<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, control, length = 6 }: FormInputOTPProps<TFieldValues, TName>) {
  // split into groups of 3 with a separator like the original layout
  const groups: number[][] = [];
  for (let i = 0; i < length; i += 3) {
    const group: number[] = [];
    for (let j = i; j < Math.min(i + 3, length); j++) group.push(j);
    groups.push(group);
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <InputOTP
            maxLength={length}
            value={field.value ?? ""}
            onChange={field.onChange}
          >
            {groups.map((group, gi) => (
              <React.Fragment key={gi}>
                <InputOTPGroup>
                  {group.map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
                {gi < groups.length - 1 && <InputOTPSeparator />}
              </React.Fragment>
            ))}
          </InputOTP>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormInputOTP;
