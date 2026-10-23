import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const TooltipWrapper = ({
  triggerText,
  content,
  triggerClassName,
  contentClassName,
}: {
  triggerText: React.ReactNode | string;
  content: React.ReactNode | string;
  triggerClassName?: string;
  contentClassName?: string;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={triggerClassName} type="button">
          {triggerText}
        </TooltipTrigger>
        <TooltipContent className={contentClassName}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
