import * as React from "react";

import { cn } from "@/lib/utils";
import { FaFile } from "react-icons/fa6";

interface FileInputProps extends React.ComponentProps<"input"> {
  label?: string;
}

const formatBytes = (bytes: number) => {
  if (!bytes) return "";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      label = "Choose file or drag & drop",
      onChange,
      accept,
      ...props
    },
    ref,
  ) => {
    const [fileName, setFileName] = React.useState<string>("");
    const [fileSize, setFileSize] = React.useState<string>("");
    const [dragActive, setDragActive] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files && e.target.files[0];
      setFileName(f ? f.name : "");
      setFileSize(f ? formatBytes(f.size) : "");
      if (onChange) onChange(e);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragActive(false);
      const files = e.dataTransfer.files;
      const f = files && files[0];
      if (f) {
        setFileName(f.name);
        setFileSize(formatBytes(f.size));
        if (onChange)
          onChange({
            target: { files },
          } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={cn(
          "flex items-center justify-between gap-3 overflow-hidden p-3 rounded-lg border bg-transparent text-sm cursor-pointer transition-colors",
          "hover:bg-accent",
          dragActive ? "bg-accent" : "",
          className,
        )}
      >
        <input
          ref={ref}
          type="file"
          onChange={handleChange}
          accept={accept}
          className="sr-only"
          {...props}
        />

        <div className="flex min-w-0 basis-1/2 items-center gap-3">
          <FaFile />

          <div className="min-w-0 w-full text-left">
            <div className="font-medium text-sm text-foreground truncate">
              {label}
            </div>
            <div className="text-xs text-muted-foreground">
              {accept
                ? `Accepted: ${accept}`
                : "CSV or Excel (.csv, .xlsx, .xls)"}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 basis-1/2 items-center justify-end gap-3">
          <div className="min-w-0 w-full text-sm text-muted-foreground text-right">
            {fileName ? (
              <>
                <div className="font-medium truncate">{fileName}</div>
                {fileSize && <div className="text-xs">{fileSize}</div>}
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                No file selected
              </div>
            )}
          </div>
        </div>
      </label>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
export { FileInput };
