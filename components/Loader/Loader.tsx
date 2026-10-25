import { Spinner } from "@/components/ui/shadcn/spinner";

const Loader = () => {
  return (
    <div className="flex items-center gap-2">
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
