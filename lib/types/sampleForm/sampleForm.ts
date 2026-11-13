import { z } from "zod";

const sampleFormSchema = z
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

type SampleFormValues = z.infer<typeof sampleFormSchema>;

const sampleFormDefaultValues: SampleFormValues = {
  name: "",
  description: "",
};

export { sampleFormSchema, sampleFormDefaultValues };

export type { SampleFormValues };
