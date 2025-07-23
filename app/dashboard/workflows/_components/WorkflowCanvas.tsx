"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Clock,
  GitBranch,
  Zap,
  Trash2,
  Settings,
} from "lucide-react";

interface WorkflowStep {
  id: string;
  type:
    | "form"
    | "email"
    | "document"
    | "payment"
    | "calendar"
    | "condition"
    | "delay"
    | "webhook";
  name: string;
  description?: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

interface WorkflowCanvasProps {
  workflow: {
    steps: WorkflowStep[];
    connections: Array<{ from: string; to: string }>;
  };
  selectedStep: string | null;
  onSelectStep: (stepId: string | null) => void;
  onUpdateStep: (stepId: string, updates: Partial<WorkflowStep>) => void;
  onDeleteStep: (stepId: string) => void;
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
    case "delay":
      return Clock;
    case "condition":
      return GitBranch;
    case "webhook":
      return Zap;
    default:
      return Zap;
  }
};

const getStepColor = (type: string) => {
  switch (type) {
    case "form":
      return "bg-blue-100 text-blue-600 border-blue-200";
    case "email":
      return "bg-green-100 text-green-600 border-green-200";
    case "document":
      return "bg-purple-100 text-purple-600 border-purple-200";
    case "payment":
      return "bg-yellow-100 text-yellow-600 border-yellow-200";
    case "calendar":
      return "bg-red-100 text-red-600 border-red-200";
    case "delay":
      return "bg-gray-100 text-gray-600 border-gray-200";
    case "condition":
      return "bg-orange-100 text-orange-600 border-orange-200";
    case "webhook":
      return "bg-indigo-100 text-indigo-600 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

export default function WorkflowCanvas({
  workflow,
  selectedStep,
  onSelectStep,
  onUpdateStep,
  onDeleteStep,
}: WorkflowCanvasProps) {
  const [draggedStep, setDraggedStep] = useState<string | null>(null);

  const handleStepClick = (stepId: string) => {
    onSelectStep(selectedStep === stepId ? null : stepId);
  };

  const handleDragStart = (stepId: string) => {
    setDraggedStep(stepId);
  };

  const handleDragEnd = () => {
    setDraggedStep(null);
  };

  return (
    <div className="relative w-full h-full bg-muted/20 overflow-auto">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {workflow.connections.map((connection, index) => {
          const fromStep = workflow.steps.find((s) => s.id === connection.from);
          const toStep = workflow.steps.find((s) => s.id === connection.to);

          if (!fromStep || !toStep) return null;

          const fromX = fromStep.position.x + 150; // Half width of step card
          const fromY = fromStep.position.y + 40; // Half height of step card
          const toX = toStep.position.x + 150;
          const toY = toStep.position.y + 40;

          return (
            <line
              key={index}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="#6b7280"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
        </defs>
      </svg>

      {/* Workflow Steps */}
      {workflow.steps.map((step) => {
        const Icon = getStepIcon(step.type);
        const isSelected = selectedStep === step.id;
        const isDragged = draggedStep === step.id;

        return (
          <Card
            key={step.id}
            className={`absolute w-72 cursor-pointer transition-all duration-200 ${
              isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
            } ${isDragged ? "opacity-50" : ""}`}
            style={{
              left: step.position.x,
              top: step.position.y,
              zIndex: isSelected ? 10 : 2,
            }}
            onClick={() => handleStepClick(step.id)}
            draggable
            onDragStart={() => handleDragStart(step.id)}
            onDragEnd={handleDragEnd}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStepColor(
                      step.type
                    )}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {step.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {step.description}
                    </p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {step.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStep(step.id);
                    }}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStep(step.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Empty State */}
      {workflow.steps.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Start Building Your Workflow
            </h3>
            <p className="text-muted-foreground mb-4">
              Add your first step from the library on the left
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
