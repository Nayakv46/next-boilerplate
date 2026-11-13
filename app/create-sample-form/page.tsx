import { Suspense } from "react";
import CreateEditSampleForm from "./CreateEditSampleForm";

type PageProps = {
  params: Promise<{
    sampleFormId: string;
  }>;
};

async function SampleFormContent({ params }: PageProps) {
  const { sampleFormId } = await params;

  return <CreateEditSampleForm sampleFormId={sampleFormId} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading sample form...</div>}>
      <SampleFormContent params={params} />
    </Suspense>
  );
}
