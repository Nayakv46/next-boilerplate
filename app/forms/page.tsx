import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Form = () => {
  const linkClassName =
    "flex items-center justify-between gap-2 rounded-lg border py-2 px-4 hover:bg-accent transition shadow-lg";
  return (
    <div className="flex flex-col flex-1 gap-4 w-full max-w-5xl mx-auto p-4 mt-10">
      <h4>Form</h4>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <Link href="/create-sample-form" className={linkClassName}>
          Create Sample Form
          <ChevronRight size={20} />
        </Link>
        <Link href="/sample-form/1" className={linkClassName}>
          Edit Sample Form
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Form;
