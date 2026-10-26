"use client";

import * as React from "react";

import { BsPencil, BsCheck, BsX } from "react-icons/bs";
import { Switch } from "@/components/ui/shadcn/switch";

interface EditableBooleanValueProps {
  value: boolean;
  onConfirm?: (value: boolean) => void | Promise<void>;
  trueLabel?: string;
  falseLabel?: string;
  disabled?: boolean;
  className?: string;
  reverseOrder?: boolean;
}

function EditableBooleanValue({
  value,
  onConfirm,
  trueLabel = "Yes",
  falseLabel = "No",
  disabled = false,
  className = "",
  reverseOrder = false,
}: EditableBooleanValueProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedValue, setEditedValue] = React.useState(value);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);

      await onConfirm?.(editedValue);

      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`relative flex items-center gap-3 h-[24px] ${className}`}>
        <div className="flex items-center gap-2">
          <Switch
            checked={editedValue}
            onCheckedChange={setEditedValue}
            disabled={disabled || isLoading}
          />

          <span className="text-sm">
            {editedValue ? trueLabel : falseLabel}
          </span>
        </div>

        <div
          className={`absolute z-10 ${reverseOrder ? "-start-16" : "-end-16"} top-1/2 -translate-y-1/2 flex gap-2`}
        >
          <button
            type="button"
            onClick={handleConfirm}
            disabled={disabled || isLoading}
            className="cursor-pointer rounded-md p-0.5 transition bg-background shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BsCheck size={20} className="text-green-600" />
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={disabled || isLoading}
            className="cursor-pointer rounded-md p-0.5 transition bg-background shadow-md disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BsX size={20} className="text-red-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[24px] ${disabled ? "cursor-not-allowed opacity-70" : ""} ${className}`}
    >
      <div className="group relative inline-flex items-center gap-2 ">
        <span>{value ? trueLabel : falseLabel}</span>

        {!disabled && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className={`absolute ${reverseOrder ? "-start-8" : "-end-8"} top-1/2 -translate-y-1/2 cursor-pointer w-[22px] h-[22px] rounded-md p-1 opacity-0 hover:shadow-md text-foreground transition hover:bg-background group-hover:opacity-100`}
          >
            <BsPencil size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export { EditableBooleanValue };
