import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Copy,
  Settings,
  MoreHorizontal,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface WorkFlowType {
  id: number;
  name: string;
  description: string;
  status: "active" | "draft";
  triggers: number;
  lastRun?: string;
  steps?: { type: string; name: string }[];
}

export default function WorkFlow({ workFlow }: { workFlow: WorkFlowType }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <CardTitle className="text-lg">{workFlow.name}</CardTitle>
              <Badge
                variant={workFlow.status === "active" ? "default" : "secondary"}
              >
                {workFlow.status}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {workFlow.description}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Workflow Steps */}
          <WorkFlowSteps workFlow={workFlow} />

          {/* Workflow Stats */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Triggers This Month
              </p>
              <p className="text-2xl font-bold">{workFlow.triggers}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Last Run
              </p>
              <p className="text-sm">{workFlow.lastRun}</p>
            </div>
            <div className="flex space-x-2">
              {workFlow.status === "active" ? (
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Activate
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/workflows/${workFlow.id}/edit`}>
                  Edit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const getStepIcon = (type: string) => {
  switch (type) {
    case "form":
      return Users;
    case "email":
      return Mail;
    case "document":
      return FileText;
    case "payment":
      return DollarSign;
    case "calendar":
      return Calendar;
    default:
      return Zap;
  }
};

function WorkFlowSteps({ workFlow }: { workFlow: WorkFlowType }) {
  if (!workFlow.steps) {
    return (
      <div>
        <h4 className="font-medium mb-3">No Workflow Steps</h4>
      </div>
    );
  }

  return (
    <div className="md:col-span-2">
      {/* Workflow Steps */}
      <div className="md:col-span-2">
        <h4 className="font-medium mb-3">Workflow Steps</h4>
        <div className="space-y-3">
          {workFlow.steps.map((step, index) => {
            const StepIcon = getStepIcon(step.type);
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <StepIcon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{step.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {step.type} step
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
