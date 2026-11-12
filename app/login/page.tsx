"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/lib/stores/userStore";
import { Form } from "@/components/ui/form/Form";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import { Button } from "@/components/ui/shadcn/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/types/login/login";
import { showErrorToast, showSuccessToast } from "@/lib/toasts";
import { POST as login } from "@/app/api/auth/login/route";

const Login = () => {
  const navigateTo = useRouter();
  const { signIn } = useUserStore();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const resp = await login(data);

      showSuccessToast("Login successful");
      signIn(data.email);
      navigateTo.push("/");
    } catch (error: any) {
      console.log("err", error);
      showErrorToast(error.message);

      if (error.status === 422) {
        form.setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
        form.setFocus("password");
      } else {
        form.setError("email", { type: "manual", message: error.message });
      }
    }
  };

  const onError = (errors: any) => {
    showErrorToast("Please fix the errors in the form");
    console.log(errors);
  };

  return (
    <div className="flex flex-col items-center gap-2 mx-auto w-full max-w-4xl p-4 mt-2 bg-popover rounded-lg shadow-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-2"
        >
          <FormTextInput control={form.control} name="email" label="Email" />
          <FormTextInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>

      <Link
        href="/signup"
        className="text-sm text-blue-500 hover:underline mt-4"
      >
        Don't have an account? Sign up
      </Link>
    </div>
  );
};

export default Login;
