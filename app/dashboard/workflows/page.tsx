import { Button } from "@/components/ui/button";
import { Plus, Zap } from "lucide-react";
import Link from "next/link";
import WorkflowStatsCards from "./WorkflowStatsCards";
import WorkFlow from "./WorkFlow";
import { WorkFlowType } from "@/utils/workFlowTypes";
import { Card, CardContent } from "@/components/ui/card";

/* UPDATE LATER WITH ACTUAL DATA, STATIC DATA FOR NOW */
const workflows: WorkFlowType[] = [
  {
    id: 1,
    name: "Web Design Onboarding",
    description: "Complete client intake for web design projects",
    status: "active",
    triggers: 12,
    lastRun: "2 hours ago",
    steps: [
      { type: "form", name: "Project Intake Form" },
      { type: "email", name: "Welcome Email" },
      { type: "document", name: "Send Contract" },
      { type: "payment", name: "Invoice & Payment Link" },
      { type: "calendar", name: "Schedule Kickoff Call" },
    ],
  },
  {
    id: 2,
    name: "Consulting Discovery",
    description: "Initial consultation and needs assessment",
    status: "active",
    triggers: 8,
    lastRun: "1 day ago",
    steps: [
      { type: "form", name: "Discovery Questionnaire" },
      { type: "email", name: "Confirmation Email" },
      { type: "calendar", name: "Book Discovery Call" },
      { type: "document", name: "Send Proposal Template" },
    ],
  },
  {
    id: 3,
    name: "Content Strategy Intake",
    description: "Gather requirements for content projects",
    status: "draft",
    triggers: 0,
    lastRun: "Never",
    steps: [
      { type: "form", name: "Content Brief Form" },
      { type: "email", name: "Next Steps Email" },
    ],
  },
];

const workFlowStatsCards = [
  {
    title: "Total WorkFlows",
    stat: "2 active, 1 draft",
    Icon: <Zap className="h-4 w-4 text-muted-foreground" />,
  },
  {},
];

export default function WorkFlowPage() {
  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold ">Workflows</h1>
              <p className="text-muted-foreground">
                Automate your client onboarding process
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/workflows/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="p-6">
        {/* Workflow Stats Grid */}
        <WorkflowStatsCards />

        {/* Workflows List */}
        <div className="space-y-6">
          {workflows.map((workFlow) => (
            <WorkFlow key={workFlow.id} workFlow={workFlow} />
          ))}
        </div>

        {/* Empty State for New Users */}
        {workflows.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first automated workflow to start saving time on
                client onboarding.
              </p>
              <Button asChild>
                <Link href="/dashboard/workflows/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Workflow
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
