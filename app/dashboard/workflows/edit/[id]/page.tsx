import WorkflowEditor from "../../_components/WorkflowEditor";

interface EditWorkflowPageProps {
  params: {
    id: string;
  };
}

export default function EditWorkflowPage({ params }: EditWorkflowPageProps) {
  return <WorkflowEditor mode="edit" workflowId={params.id} />;
}
