import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/userStore";
import { Form } from "@/components/ui/form/Form";
import { useForm } from "react-hook-form";
import { FormTextInput } from "@/components/ui/form/FormTextInput";
import { Button } from "@/components/ui/shadcn/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/types/login/login";
import { showErrorToast, showSuccessToast } from "@/lib/toasts";
import axios from "../axiosConfig";

const SignUp = () => {
  const navigateTo = useRouter();
  const { signIn } = useUserStore();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      retryPassword: "",
      first_name: "",
      last_name: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const resp = await axios.post("/api/auth/signup", data);

      showSuccessToast("Sign up successful");
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
            name="first_name"
            label="First Name"
          />
          <FormTextInput
            control={form.control}
            name="last_name"
            label="Last Name"
          />
          <FormTextInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
          />
          <FormTextInput
            control={form.control}
            name="retryPassword"
            label="Confirm Password"
            type="password"
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Form>
      <Link
        href="/login"
        className="text-sm text-blue-500 hover:underline mt-4"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
};

export default SignUp;
