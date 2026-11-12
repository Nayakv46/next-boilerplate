import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Home = () => {
  const linkClassName =
    "flex items-center justify-between gap-2 rounded-lg border py-2 px-4 hover:bg-accent transition shadow-lg";
  return (
    <div className="flex flex-col gap-8 p-4 mt-10">
      <div className="flex flex-col gap-4">
        <h4 className="max-w-xl text-center mx-auto">
          Kickstart your project with Next.js, Vite, React, TypeScript,
          TailwindCSS, and ShadCN UI. This template is designed to help you
          quickly set up a modern web application with a clean and responsive
          user interface.
        </h4>
        <p className="max-w-xl text-center mx-auto">
          Navigate through available components to see the template in action.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full max-w-5xl mx-auto gap-4">
        <Link href="/components" className={linkClassName}>
          Components
          <ChevronRight size={20} />
        </Link>
        <Link href="/forms" className={linkClassName}>
          Forms
          <ChevronRight size={20} />
        </Link>
        <Link href="/charts" className={linkClassName}>
          Charts
          <ChevronRight size={20} />
        </Link>
        <Link href="/tables" className={linkClassName}>
          Tables
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
