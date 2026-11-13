import type { TOrganization } from "@/services/organizations";
import type { OrganizationFormValues } from "@/lib/types/organization/organization";

export const mapDetailToFormValues = (
  organization: TOrganization,
): OrganizationFormValues => {
  return {
    name: organization.name,
    description: organization.description ?? "",
  };
};
