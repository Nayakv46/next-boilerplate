import type { SampleFormValues } from "@/lib/types/sampleForm/sampleForm";

export const mapDetailToFormValues = (sampleFormValues: {
  // This type should be imported from /api or /types folder
  name: string;
  description?: string | null | undefined;
}): SampleFormValues => {
  return {
    name: sampleFormValues.name,
    description: sampleFormValues.description ?? "",
  };
};
