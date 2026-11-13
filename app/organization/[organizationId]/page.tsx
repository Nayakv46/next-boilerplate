import { Suspense } from "react";
import CreateEditOrganization from "./CreateEditOrganization";

type PageProps = {
  params: Promise<{
    organizationId: string;
  }>;
};

async function OrganizationContent({ params }: PageProps) {
  const { organizationId } = await params;

  return <CreateEditOrganization organizationId={organizationId} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading organization...</div>}>
      <OrganizationContent params={params} />
    </Suspense>
  );
}
