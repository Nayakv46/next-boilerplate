"use client";
"use no memo";

import { useMemo } from "react";
import { useTable, stockFeatures } from "@tanstack/react-table";
import { Table } from "@/components/Table/Table";
import { columns } from "@/components/columns/OrganizationListColumns/OrganizationListColumns";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { useOrganizationsStore } from "@/lib/stores/organizationsStore";
import { useGetAllOrganizations } from "@/hooks/useOrganizations";

const OrganizationList = () => {
  const { setOrganizations } = useOrganizationsStore();

  const onGetAllOrganizationsSuccess = (data: any) => {
    console.log("data", data);
    setOrganizations(data);
  };

  const { data, isLoading, isError } = useGetAllOrganizations(
    onGetAllOrganizationsSuccess,
  );

  const organizations = useMemo(() => data ?? [], [data]);
  const table = useTable({
    data: organizations,
    columns,
    features: stockFeatures,
  });

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Loading organizations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-destructive">
        Failed to load organizations. You might need to log in!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full p-4 bg-popover rounded-lg shadow-lg">
      <div className="flex justify-between items-center gap-2 flex-wrap-reverse">
        <h4>Organization List</h4>

        <Link href="/create-organization" className="flex ml-auto">
          <Button type="button">Create Organization</Button>
        </Link>
      </div>
      {!organizations.length ? (
        <div className="p-4 text-sm text-muted-foreground">
          No organizations found.
        </div>
      ) : (
        <Table table={table} />
      )}
    </div>
  );
};

export default OrganizationList;
