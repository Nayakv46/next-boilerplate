"use client";
import { Button } from "@/components/ui/shadcn/button";
import { FiMinusSquare } from "react-icons/fi";
import Link from "next/link";
import { Table } from "@/components/Table/Table";
import { useMemo, useRef } from "react";
import { projectsSeed, type Project } from "./projectsData";
import { useTable, stockFeatures } from "@tanstack/react-table";
import { columns } from "@/components/columns/ProjectColumns/ProjectColumns";
import { SVGTableConnector } from "@/components/SVGTableConnector/SVGTableConnector";

const ProjectsTable = () => {
  const grouping = useMemo(() => ["function"], []);

  const projectsData = useMemo<Project[]>(
    () => {
      return [
        ...projectsSeed,
        // ...(data ?? [])
      ];
    },
    [
      // data
    ],
  );

  const tableRef = useRef<HTMLDivElement>(null);

  const table = useTable({
    data: projectsData,
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
      <div className="flex justify-between gap-2 items-center flex-wrap-reverse">
        <div className="flex items-center gap-3 relative">
          <FiMinusSquare className="min-w-5 min-h-5 text-[#3755F6]" />
          <h2 className="text-lg font-semibold">Projects</h2>
        </div>

        <Link href={`/tables`} className="btn btn-primary ml-auto">
          <Button type="button">Create Project</Button>
        </Link>
      </div>

      <div className="flex flex-col relative">
        <SVGTableConnector tableRef={tableRef} data={projectsData} />
        <div className="ml-6 " ref={tableRef}>
          <Table table={table} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsTable;
