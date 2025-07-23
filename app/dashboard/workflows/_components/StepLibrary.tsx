"use client";

import { Button } from "@/components/ui/button";
import {
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Clock,
  GitBranch,
  Zap,
} from "lucide-react";

interface StepLibraryProps {
  onAddStep: (stepType: string) => void;
}

const stepTypes = [
  {
    type: "form",
    name: "Form",
    description: "Collect information from clients",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    type: "email",
    name: "Email",
    description: "Send automated emails",
    icon: Mail,
    color: "bg-green-100 text-green-600",
  },
  {
    type: "document",
    name: "Document",
    description: "Send contracts or documents",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
  {
    type: "payment",
    name: "Payment",
    description: "Request payment or invoice",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    type: "calendar",
    name: "Calendar",
    description: "Schedule meetings or calls",
    icon: Calendar,
    color: "bg-red-100 text-red-600",
  },
  {
    type: "delay",
    name: "Delay",
    description: "Wait for a specific time",
    icon: Clock,
    color: "bg-gray-100 text-gray-600",
  },
  {
    type: "condition",
    name: "Condition",
    description: "Branch based on conditions",
    icon: GitBranch,
    color: "bg-orange-100 text-orange-600",
  },
  {
    type: "webhook",
    name: "Webhook",
    description: "Trigger external services",
    icon: Zap,
    color: "bg-indigo-100 text-indigo-600",
  },
];

export default function StepLibrary({ onAddStep }: StepLibraryProps) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {stepTypes.map((stepType) => {
        const Icon = stepType.icon;
        return (
          <Button
            key={stepType.type}
            variant="outline"
            className="h-auto p-3 justify-start bg-transparent hover:bg-muted/50"
            onClick={() => onAddStep(stepType.type)}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${stepType.color}`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-left">
              <h6 className="font-medium text-sm">{stepType.name}</h6>
              <p className="text-xs text-muted-foreground">
                {stepType.description}
              </p>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
