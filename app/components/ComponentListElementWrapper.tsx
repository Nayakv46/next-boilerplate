import React from "react";

const ComponentListElementWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div
      className={
        "flex flex-col gap-2 py-2 px-4 border rounded-lg hover:bg-accent transition shadow-lg"
      }
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export default ComponentListElementWrapper;
