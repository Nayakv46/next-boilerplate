import {
  Popover,
  PopoverContent,
  // PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const PopoverWrapper = ({
  trigger,
  title,
  description,
  className,
  align = "end",
}: {
  trigger: React.ReactNode | string;
  title?: React.ReactNode | string;
  description: React.ReactNode | string;
  className?: string;
  align?: "start" | "center" | "end";
}) => {
  return (
    <Popover>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent align={align} className={className ?? ""}>
        <PopoverHeader>
          {title ? <PopoverTitle>{title}</PopoverTitle> : null}
          {description}
          {/* <PopoverDescription>

</PopoverDescription> */}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
