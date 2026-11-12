"use client";

import { toast } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  Loader2Icon,
  CircleXIcon,
} from "lucide-react";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastOpts = {
  duration?: number;
  action?: ToastAction;
};

const DEFAULT_DURATION = 5000;

export function showErrorToast(message: string, opts?: ToastOpts) {
  toast(message, {
    icon: <CircleXIcon className="size-4" stroke="var(--destructive)" />,
    className: "cn-toast cn-toast-destructive",
    duration: opts?.duration ?? DEFAULT_DURATION,
    action: opts?.action
      ? {
          label: opts.action.label,
          onClick: opts.action.onClick,
        }
      : undefined,
  });
}

export function showSuccessToast(message: string, opts?: ToastOpts) {
  toast(message, {
    icon: <CircleCheckIcon className="size-4" stroke="var(--icon-success)" />,
    className: "cn-toast cn-toast-success",
    duration: opts?.duration ?? DEFAULT_DURATION,
    action: opts?.action
      ? {
          label: opts.action.label,
          onClick: opts.action.onClick,
        }
      : undefined,
  });
}

export function showInfoToast(message: string, opts?: ToastOpts) {
  toast(message, {
    icon: <InfoIcon className="size-4" stroke="var(--icon-info)" />,
    className: "cn-toast cn-toast-info",
    duration: opts?.duration ?? DEFAULT_DURATION,
    action: opts?.action
      ? {
          label: opts.action.label,
          onClick: opts.action.onClick,
        }
      : undefined,
  });
}

export function showWarningToast(message: string, opts?: ToastOpts) {
  toast(message, {
    icon: <TriangleAlertIcon className="size-4" stroke="var(--icon-warning)" />,
    className: "cn-toast cn-toast-warning",
    duration: opts?.duration ?? DEFAULT_DURATION,
    action: opts?.action
      ? {
          label: opts.action.label,
          onClick: opts.action.onClick,
        }
      : undefined,
  });
}

export function showLoadingToast(message: string, opts?: { id?: string }) {
  // sonner supports returning an id or passing id to update later
  const id = (opts as any)?.id;
  toast(message, {
    icon: <Loader2Icon className="size-4 animate-spin" />,
    className: "cn-toast cn-toast-loading",
    duration: 0, // persist until dismissed or updated
    id,
  });
}

export function dismissToast(id?: string) {
  toast.dismiss(id);
}
