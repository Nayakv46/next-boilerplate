"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type TCreateSampleFormRequest } from "@/services/sampleForms";
import {
  useCreateSampleForm,
  useDeleteSampleForm,
  useGetSampleFormBySampleFormId,
  useUpdateSampleForm,
} from "@/hooks/useSampleForms";
import { Form } from "@/components/ui/form/Form";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import FormTextarea from "@/components/ui/form/FormTextarea";
import { Button } from "@/components/ui/shadcn/button";
import { showErrorToast, showSuccessToast } from "@/lib/toasts";
import {
  sampleFormDefaultValues,
  sampleFormSchema,
  type SampleFormValues,
} from "@/lib/types/sampleForm/sampleForm";
import { mapDetailToFormValues } from "../sample-form/[sampleFormId]/utils";
import { LuChevronFirst } from "react-icons/lu";
import AlertDialogWrapper from "@/components/ui/shadcn/AlertDialogWrapper";

type Props = {
  sampleFormId: string;
};

const CreateEditSampleForm = ({ sampleFormId }: Props) => {
  const navigateTo = useRouter();

  const form = useForm<SampleFormValues>({
    defaultValues: sampleFormDefaultValues,
    mode: "onChange",
    resolver: zodResolver(sampleFormSchema),
  });

  const { data: organizationDetail, isLoading: isLoadingOrganization } =
    useGetSampleFormBySampleFormId(sampleFormId);

  const createOrganizationMutation = useCreateSampleForm();
  const updateOrganizationMutation = useUpdateSampleForm();
  const deleteOrganizationMutation = useDeleteSampleForm();

  useEffect(() => {
    if (!organizationDetail) return;

    const mapped = mapDetailToFormValues(organizationDetail);
    form.reset(mapped);
  }, [organizationDetail, form]);

  const onSubmit = async (values: SampleFormValues) => {
    const name = values.name.trim();
    const description = values.description.trim();
    const payload: TCreateSampleFormRequest = {
      name,
      description: description.length > 0 ? description : undefined,
    };

    if (sampleFormId) {
      if (!sampleFormId) {
        showErrorToast("Missing sample form id for update.");
        return;
      }

      try {
        await updateOrganizationMutation.mutateAsync({
          id: sampleFormId,
          payload,
        });
        showSuccessToast("Sample form updated successfully");
        return;
      } catch (error) {
        showErrorToast(
          error instanceof Error
            ? error.message
            : "Failed to update sample form. Please try again.",
        );
        return;
      }
    }

    try {
      const created = await createOrganizationMutation.mutateAsync(payload);

      showSuccessToast("Sample form created successfully");
      navigateTo.push(`/sample-form/${created.id}`);
    } catch (error) {
      showErrorToast(
        error instanceof Error
          ? error.message
          : "Failed to create sample form. Please try again.",
      );
    }
  };

  const onError = (errors: unknown) => {
    console.error("Form validation errors:", errors);
    showErrorToast("Please fix the form errors before submitting.");
  };

  return (
    <div className="mx-auto w-full max-w-5xl p-4 mt-4 bg-popover rounded-lg shadow-lg">
      <div className="flex gap-2 justify-between flex-wrap mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">
            {sampleFormId ? "Edit Sample Form" : "Create Sample Form"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure the sample form name and description.
          </p>
        </div>

        <div className="flex flex-col gap-1 ">
          <Link href="/forms" className="flex gap-1 items-center">
            <LuChevronFirst className="text-base" />
            Forms
          </Link>
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
                placeholder="Sample Name"
              />
              <FormTextarea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Short summary of the sample form"
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
              {sampleFormId
                ? updateOrganizationMutation.isPending
                  ? "Saving..."
                  : "Save Changes"
                : createOrganizationMutation.isPending
                  ? "Creating..."
                  : "Create Sample Form"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => navigateTo.push("/forms")}
            >
              Cancel
            </Button>

            {sampleFormId ? (
              <AlertDialogWrapper
                title="Delete Sample Form?"
                description="This action cannot be undone. The sample form will be permanently removed."
                confirmText={
                  deleteOrganizationMutation.isPending
                    ? "Deleting..."
                    : "Delete"
                }
                cancelText="Cancel"
                onClick={async () => {
                  if (!sampleFormId) return;
                  await deleteOrganizationMutation.mutateAsync(sampleFormId);
                  navigateTo.push("/forms");
                }}
                triggerButtonProps={{
                  variant: "destructive",
                  type: "button",
                  text: deleteOrganizationMutation.isPending
                    ? "Deleting..."
                    : "Delete Sample Form",
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

export default CreateEditSampleForm;
