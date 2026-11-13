"use client";
import ImplementationOverview from "./ImplementationOverview/ImplementationOverview";
import ProjectsTable from "./Projects/ProjectsTable";
import OrganizationList from "./Organizations/OrganizationList";

const Tables = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h4>Tables</h4>

      <OrganizationList />

      <ProjectsTable />

      <ImplementationOverview />
    </div>
  );
};

export default Tables;
