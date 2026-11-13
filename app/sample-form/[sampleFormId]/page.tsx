import { Suspense } from "react";
import CreateEditSampleForm from "./CreateEditSampleForm";

type Props = {
  params: Promise<{
    sampleFormId: string;
  }>;
};

async function SampleFormContent({ params }: Props) {
  const { sampleFormId } = await params;

  return <CreateEditSampleForm sampleFormId={sampleFormId} />;
}

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SampleFormContent params={params} />
    </Suspense>
  );
}
