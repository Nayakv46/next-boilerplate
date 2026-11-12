import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    retryPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters long"),
  })
  .superRefine(({ password, retryPassword }, ctx) => {
    if (password !== retryPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export { loginSchema, signUpSchema };
