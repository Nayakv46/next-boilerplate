import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";

type AlertDialogWrapperProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  confirmText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  // custom trigger element (if provided, it will be used as the trigger)
  trigger?: React.ReactNode;
  // convenience props for a built-in trigger button
  triggerButtonProps?: React.ComponentProps<typeof Button> & {
    text?: React.ReactNode;
  };
  // control dialog open state externally
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  // allow custom content instead of title/description
  children?: React.ReactNode;
  // show footer actions
  showActions?: boolean;
  // size for the content (passed to AlertDialogContent)
  size?: "default" | "sm";
};

const AlertDialogWrapper = ({
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  onClick,
  onCancel,
  trigger,
  triggerButtonProps,
  open,
  defaultOpen,
  onOpenChange,
  children,
  showActions = true,
  size = "default",
}: AlertDialogWrapperProps) => {
  const renderTrigger = () => {
    if (trigger) return <AlertDialogTrigger>{trigger}</AlertDialogTrigger>;

    if (triggerButtonProps)
      return (
        <AlertDialogTrigger>
          <Button type="button" {...triggerButtonProps}>
            {triggerButtonProps.text ?? triggerButtonProps.children}
          </Button>
        </AlertDialogTrigger>
      );

    return null;
  };

  return (
    <AlertDialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {renderTrigger()}

      <AlertDialogContent size={size}>
        {children ? (
          children
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              {description && (
                <AlertDialogDescription>{description}</AlertDialogDescription>
              )}
            </AlertDialogHeader>
            {showActions && (
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={onCancel}
                  className="cursor-pointer"
                >
                  {cancelText}
                </AlertDialogCancel>
                <AlertDialogAction onClick={onClick} className="cursor-pointer">
                  {confirmText}
                </AlertDialogAction>
              </AlertDialogFooter>
            )}
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogWrapper;
