import { mapFunctionToLabel } from "@/lib/utils/labelFormat";
import { type ColumnDef, type StockFeatures } from "@tanstack/react-table";
import Link from "next/link";

export interface Project {
  id?: string | undefined;
  function: string;
  owner: string;
  project_name: string;
  description: string;
  impact_score: string;
}

export const getScoreColor = (score: string) => {
  const num = parseInt(score?.split("/")[0]);
  if (num >= 8) return "text-[#21D67C]";
  if (num >= 6) return "text-[#FFC720]";
  return "text-[#EF3235]";
};

export const columns: ColumnDef<StockFeatures, Project>[] = [
  {
    accessorKey: "function",
    header: "Function",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ getValue }) => (
      <span className="font-medium">
        {mapFunctionToLabel(getValue<string>())}
      </span>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ getValue }) => getValue<string>(),
  },
  {
    accessorKey: "project_name",
    header: "Project Name",
    meta: { headerClassName: "", widthRatio: 2 },
    cell: ({ row, getValue }) => (
      <>
        {/* A template way to link to entry edition */}
        {"id" in row.original && "organization_id" in row.original ? (
          <Link
            href={`/organization/${row.original.organization_id}/project/${row.original.id}`}
            className="font-medium underline"
          >
            {getValue<string>()}
          </Link>
        ) : (
          <span className="font-medium">{getValue<string>()}</span>
        )}
      </>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { headerClassName: "", widthRatio: 4 },
    cell: ({ getValue }) => (
      <span className="truncate block text-text-gray">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "impact_score",
    header: "Impact Score",
    meta: { headerClassName: "text-center", widthRatio: 1, minWidth: "80px" },
    cell: ({ getValue }) => (
      <span
        className={`flex w-full min-w-min justify-center font-semibold ${getScoreColor(getValue<string>())}`}
      >
        {getValue<string>()}
      </span>
    ),
  },
];
