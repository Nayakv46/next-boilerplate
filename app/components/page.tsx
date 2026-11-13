import Toasts from "./Toasts";
import BaseComponents from "./BaseComponents";
import FormComponents from "./FormComponents";

const Components = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <BaseComponents />

      <div className="h-px w-full bg-border" />

      <Toasts />

      <div className="h-px w-full bg-border" />

      <FormComponents />
    </div>
  );
};

export default Components;
