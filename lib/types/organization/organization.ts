import { z } from "zod";

const organizationFormSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim(),
  })
  .superRefine((values, ctx) => {
    if (values.description === "") {
      ctx.addIssue({
        code: "custom",
        path: ["description"],
        message: "Description cannot be blank when provided",
      });
    }
  });

type OrganizationFormValues = z.infer<typeof organizationFormSchema>;

const organizationFormDefaultValues: OrganizationFormValues = {
  name: "",
  description: "",
};

export { organizationFormSchema, organizationFormDefaultValues };

export type { OrganizationFormValues };
