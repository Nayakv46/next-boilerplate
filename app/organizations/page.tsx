"use client";
"use no memo";

import { useMemo } from "react";
import { useTable, stockFeatures } from "@tanstack/react-table";
import { useGetAllOrganizations } from "@/hooks/useOrganizations";
import { Table } from "@/components/Table/Table";
import { columns } from "@/components/columns/OrganizationListColumns/OrganizationListColumns";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import { useOrganizationsStore } from "@/lib/stores/organizationsStore";
import OrganiaztionsList from "@/components/OrganizationList/OrganizationList";

const OrganizationList = () => {
  const { setOrganizations } = useOrganizationsStore();
  const onGetAllOrganizationsSuccess = (data: any) => {
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
        Failed to load organizations. You might have to log in
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full h-full py-2 px-2 sm:px-4">
      <div className="flex flex-col gap-2">
        <p>
          You can also use this component to display a list of organizations and
          switch between context.
        </p>
        <OrganiaztionsList />
      </div>
      <div className="flex flex-col gap-2 w-full p-4 bg-popover rounded-lg shadow-lg">
        <div className="flex justify-between gap-2">
          <h4>Organization List</h4>

          <Link href="/create-organization">
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
    </main>
  );
};

export default OrganizationList;
