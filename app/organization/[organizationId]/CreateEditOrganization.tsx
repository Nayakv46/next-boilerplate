"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type TCreateOrganizationRequest } from "@/services/organizations";
import {
  useCreateOrganization,
  useDeleteOrganization,
  useGetOrganizationByOrganizationId,
  useUpdateOrganization,
} from "@/hooks/useOrganizations";
import { Form } from "@/components/ui/form/Form";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import FormTextarea from "@/components/ui/form/FormTextarea";
import { Button } from "@/components/ui/shadcn/button";
import { showErrorToast, showSuccessToast } from "@/lib/toasts";
import {
  organizationFormDefaultValues,
  organizationFormSchema,
  type OrganizationFormValues,
} from "@/lib/types/organization/organization";
import { mapDetailToFormValues } from "./utils";
import {
  LuChevronFirst,
  // LuChevronLast
} from "react-icons/lu";
import AlertDialogWrapper from "@/components/ui/shadcn/AlertDialogWrapper";
import { useUserStore } from "@/lib/stores/userStore";

type Props = {
  organizationId: string;
};

const CreateEditOrganization = ({ organizationId }: Props) => {
  const { session } = useUserStore();
  const navigateTo = useRouter();
  const form = useForm<OrganizationFormValues>({
    defaultValues: organizationFormDefaultValues,
    mode: "onChange",
    resolver: zodResolver(organizationFormSchema),
  });

  const { data: organizationDetail, isLoading: isLoadingOrganization } =
    useGetOrganizationByOrganizationId(organizationId);

  const createOrganizationMutation = useCreateOrganization();
  const updateOrganizationMutation = useUpdateOrganization();
  const deleteOrganizationMutation = useDeleteOrganization();

  useEffect(() => {
    if (!organizationDetail) return;

    const mapped = mapDetailToFormValues(organizationDetail);
    form.reset(mapped);
  }, [organizationDetail, form]);

  const onSubmit = async (values: OrganizationFormValues) => {
    const name = values.name.trim();
    const description = values.description.trim();
    const payload: TCreateOrganizationRequest = {
      name,
      description: description.length > 0 ? description : undefined,
    };

    if (organizationId) {
      if (!organizationId) {
        showErrorToast("Missing organization id for update.");
        return;
      }

      try {
        await updateOrganizationMutation.mutateAsync({
          id: organizationId,
          payload,
        });
        showSuccessToast("Organization updated successfully");
        return;
      } catch (error) {
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to update organization. Please try again.",
        );
        return;
      }
    }

    try {
      const created = await createOrganizationMutation.mutateAsync(payload);

      showSuccessToast("Organization created successfully");
      navigateTo.push(`/organization/${created.id}`);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to create organization. Please try again.",
      );
    }
  };

  const onError = (errors: unknown) => {
    console.error("Form validation errors:", errors);
    showErrorToast("Please fix the form errors before submitting.");
  };

  return (
    <div className="mx-auto w-full max-w-5xl p-4 bg-popover rounded-lg shadow-lg">
      <div className="flex gap-2 justify-between mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            {organizationId ? "Edit Organization" : "Create Organization"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure the organization name and description.
          </p>
          {!session.isAuthenticated && (
            <>
              <p className="text-red-500">
                You must be logged in to create or edit an organization. But you
                can still preview the form functionality
              </p>
              <Link href="/forms" className="text-blue-500!">
                here
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1 ">
          <Link href="/organizations" className="flex gap-1 items-center">
            <LuChevronFirst className="text-base" />
            Organizations
          </Link>
          {/* {organizationId && (
            <Link
              to={`/organization/${organizationId}/users`}
              className="flex gap-1 items-center"
            >
              <LuChevronLast className="text-base" />
              Users
            </Link>
          )} */}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-6"
        >
          <section className="flex flex-col gap-4 rounded-lg border p-4">
            <h2 className="text-lg font-medium">Basics</h2>
            <div className="flex flex-col gap-2 ">
              <FormTextInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Acme Corp"
              />
              <FormTextarea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Short summary of the organization"
              />
            </div>
          </section>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={
                createOrganizationMutation.isPending ||
                updateOrganizationMutation.isPending ||
                isLoadingOrganization
              }
            >
              {organizationId
                ? updateOrganizationMutation.isPending
                  ? "Saving..."
                  : "Save Changes"
                : createOrganizationMutation.isPending
                  ? "Creating..."
                  : "Create Organization"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigateTo.push("/organizations")}
            >
              Cancel
            </Button>

            {organizationId ? (
              <AlertDialogWrapper
                title="Delete Organization?"
                description="This action cannot be undone. The organization will be permanently removed."
                confirmText={
                  deleteOrganizationMutation.isPending
                    ? "Deleting..."
                    : "Delete"
                }
                cancelText="Cancel"
                onClick={async () => {
                  if (!organizationId) return;
                  await deleteOrganizationMutation.mutateAsync({
                    id: organizationId,
                  });
                  navigateTo.push("/organizations");
                }}
                triggerButtonProps={{
                  variant: "destructive",
                  type: "button",
                  text: deleteOrganizationMutation.isPending
                    ? "Deleting..."
                    : "Delete Organization",
                  disabled:
                    deleteOrganizationMutation.isPending ||
                    isLoadingOrganization,
                }}
              />
            ) : null}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEditOrganization;
