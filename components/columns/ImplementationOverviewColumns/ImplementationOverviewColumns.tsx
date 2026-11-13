import type { Implementation } from "@/app/tables/ImplementationOverview/sampleData";
import { formatIsoDateToReadable } from "@/lib/utils/dateFormat";
import { formatNumberLowerCase } from "@/lib/utils/numbeFormat";
import { type ColumnDef, type StockFeatures } from "@tanstack/react-table";
import Link from "next/link";

export const getScoreColor = (score: number) => {
  if (score >= 80) return "text-[#21D67C]";
  if (score >= 60) return "text-[#FFC720]";
  return "text-[#EF3235]";
};

export const columns: ColumnDef<StockFeatures, Implementation>[] = [
  {
    accessorKey: "function",
    header: "Function",
    meta: { headerClassName: "w-0", widthRatio: 0 },
    cell: ({ getValue }) => (
      <span className="text-sm font-medium  block">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "overview",
    header: "Overview",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ row }) => (
      <>
        {/* A template way to link to entry edition */}
        {"id" in row.original && "organization_id" in row.original ? (
          <Link
            href={`/organization/${row.original.organization_id}/implementation-overview/${row.original.id}`}
            className="font-medium underline truncate"
          >
            See Details
          </Link>
        ) : (
          <button type="button" className="font-medium  truncate">
            See Details
          </button>
        )}
      </>
    ),
  },
  {
    accessorKey: "scope",
    header: "Scope",
    meta: { headerClassName: "", widthRatio: 0.7 },
    cell: () => (
      <button type="button" className="font-medium truncate">
        View
      </button>
    ),
  },
  {
    accessorKey: "description",
    header: "Desired outcome",
    meta: { headerClassName: "", widthRatio: 3 },
    cell: ({ getValue }) => getValue<string>(),
  },
  {
    accessorKey: "mvp_budget",
    header: "MVP Budget",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ getValue }) => `£${formatNumberLowerCase(getValue<number>())}`,
  },
  {
    accessorKey: "production_budget",
    header: "Production Budget",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ getValue }) => `£${formatNumberLowerCase(getValue<number>())}`,
  },
  {
    accessorKey: "operating_budget",
    header: "Operating Budget",
    meta: { headerClassName: "", widthRatio: 1 },
    cell: ({ getValue }) => `£${formatNumberLowerCase(getValue<number>())}`,
  },
  {
    accessorKey: "mvp_end_date",
    header: "Deadline MVP",
    meta: { headerClassName: "", widthRatio: 1.5 },
    cell: ({ getValue }) => formatIsoDateToReadable(getValue<string>()),
  },
  {
    accessorKey: "production_end_date",
    header: "Deadline Production",
    meta: { headerClassName: "", widthRatio: 2 },
    cell: ({ getValue }) => formatIsoDateToReadable(getValue<string>()),
  },
  // {
  //   accessorKey: "functional_score",
  //   header: "Functional Score",
  //   meta: { headerClassName: "", widthRatio: 0, isGroupScoreColumn: true },
  //   cell: ({ getValue }) => (
  //     <span
  //       className={`font-bold text-lg ${getScoreColor(getValue<number>())}`}
  //     >
  //       {getValue<number>()}
  //     </span>
  //   ),
  // },
];
