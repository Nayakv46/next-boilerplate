"use client";
import ComponentListElementWrapper from "./ComponentListElementWrapper";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
  showLoadingToast,
  dismissToast,
} from "@/lib/toasts";
import { Button } from "@/components/ui/shadcn/button";

const Toasts = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4>Toasts</h4>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        <ComponentListElementWrapper title="Success Toast">
          <Button
            type="button"
            className="bg-success cursor-pointer"
            onClick={() => showSuccessToast("This is a success toast!")}
          >
            Show Success Toast
          </Button>
        </ComponentListElementWrapper>
        <ComponentListElementWrapper title="Error Toast">
          <Button
            type="button"
            className="bg-destructive cursor-pointer"
            onClick={() => showErrorToast("This is an error toast!")}
          >
            Show Error Toast
          </Button>
        </ComponentListElementWrapper>
        <ComponentListElementWrapper title="Info Toast">
          <Button
            type="button"
            className="bg-info cursor-pointer"
            onClick={() => showInfoToast("This is an info toast!")}
          >
            Show Info Toast
          </Button>
        </ComponentListElementWrapper>
        <ComponentListElementWrapper title="Warning Toast">
          <Button
            type="button"
            className="bg-warning cursor-pointer"
            onClick={() => showWarningToast("This is a warning toast!")}
          >
            Show Warning Toast
          </Button>
        </ComponentListElementWrapper>
        <ComponentListElementWrapper title="Loading Toast">
          <Button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              showLoadingToast("This is a loading toast!", {
                id: "loading-toast",
              });
              setTimeout(() => {
                dismissToast("loading-toast");
              }, 5000); // Dismiss after 5 seconds
            }}
          >
            Show Loading Toast
          </Button>
        </ComponentListElementWrapper>
      </div>
    </div>
  );
};

export default Toasts;
