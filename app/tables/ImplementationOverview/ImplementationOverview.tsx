"use client";
import { useTable, stockFeatures } from "@tanstack/react-table";
import { FiMinusSquare } from "react-icons/fi";
import { columns } from "@/components/columns/ImplementationOverviewColumns/ImplementationOverviewColumns";
import { Table } from "@/components/Table/Table";
import { SVGTableConnector } from "@/components/SVGTableConnector/SVGTableConnector";
import { useMemo, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { sampleRows, type Implementation } from "./sampleData";

const ImplementationOverview = () => {
  const grouping = useMemo(() => ["function"], []);

  const implementationsData = useMemo<Implementation[]>(
    () => {
      return [
        ...sampleRows,
        // ...(data ?? [])
      ];
    },
    [
      // data
    ],
  );

  const tableRef = useRef<HTMLDivElement>(null);

  const table = useTable({
    data: implementationsData,
    columns,
    state: {
      grouping,
      expanded: true,
    },
    enableExpanding: true,
    features: stockFeatures,
  });

  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-popover rounded-lg shadow-lg">
      <div className="flex justify-between items-center gap-2 flex-wrap-reverse">
        <div className="flex items-center gap-3 relative">
          <FiMinusSquare className="w-5 h-5 text-[#3755F6]" />
          <h2 className="text-lg font-semibold">Implementation Overview</h2>
        </div>

        <Link href={`/tables`} className="flex ml-auto">
          <Button type="button">Create Implementation Overview</Button>
        </Link>
      </div>

      <div className="flex flex-col relative">
        {tableRef && (
          <SVGTableConnector tableRef={tableRef} data={implementationsData} />
        )}
        <div className="ml-6" ref={tableRef}>
          <Table table={table} />
        </div>
      </div>
    </div>
  );
};

export default ImplementationOverview;
