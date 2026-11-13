import type { Organization } from "@/app/tables/Organizations/sampleData";
import { formatDate } from "@/lib/utils/dateFormat";
import type { ColumnDef, StockFeatures } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<StockFeatures, Organization>[] = [
  {
    accessorKey: "name",
    header: "Name",
    meta: { widthRatio: 2 },
    cell: ({ row }) => (
      <>
        {/* A template way to link to entry edition */}
        {row.original.id ? (
          <Link
            href={`/organization/${row.original.id}`}
            className="font-medium underline!"
          >
            {row.original.name}
          </Link>
        ) : (
          row.original.name
        )}
      </>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    meta: { widthRatio: 3 },
    cell: ({ row }) => row.original.description,
  },
  {
    accessorKey: "created_at",
    header: "Created",
    meta: { widthRatio: 1.2 },
    cell: ({ row }) => formatDate(row.original.created_at),
  },
];
