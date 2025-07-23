"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Play, Eye, Plus } from "lucide-react";
import Link from "next/link";
import StepLibrary from "./StepLibrary";
import WorkflowCanvas from "./WorkflowCanvas";
import StepConfigPanel from "./StepconfigPanel";

interface WorkflowEditorProps {
  mode: "create" | "edit";
  workflowId?: string;
}

interface WorkflowStep {
  id: string;
  type:
    | "form"
    | "email"
    | "document"
    | "payment"
    | "calendar"
    | "condition"
    | "delay";
  name: string;
  description?: string;
  config: Record<string, any>;
  position: { x: number; y: number };
}

interface WorkflowData {
  id?: string;
  name: string;
  description: string;
  status: "active" | "draft";
  steps: WorkflowStep[];
  connections: Array<{ from: string; to: string }>;
}

const mockWorkflowData: WorkflowData = {
  id: "1",
  name: "Web Design Onboarding",
  description: "Complete client intake for web design projects",
  status: "active",
  steps: [
    {
      id: "step-1",
      type: "form",
      name: "Project Intake Form",
      description: "Collect initial project requirements",
      config: { formId: "intake-form-1" },
      position: { x: 100, y: 100 },
    },
    {
      id: "step-2",
      type: "email",
      name: "Welcome Email",
      description: "Send welcome email to client",
      config: { templateId: "welcome-template" },
      position: { x: 300, y: 100 },
    },
    {
      id: "step-3",
      type: "document",
      name: "Send Contract",
      description: "Send contract for signature",
      config: { documentId: "contract-template" },
      position: { x: 500, y: 100 },
    },
  ],
  connections: [
    { from: "step-1", to: "step-2" },
    { from: "step-2", to: "step-3" },
  ],
};

export default function WorkflowEditor({
  mode,
  workflowId,
}: WorkflowEditorProps) {
  const [workflow, setWorkflow] = useState<WorkflowData>({
    name: "",
    description: "",
    status: "draft",
    steps: [],
    connections: [],
  });
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showStepLibrary, setShowStepLibrary] = useState(false);

  useEffect(() => {
    if (mode === "edit" && workflowId) {
      // In real app, fetch workflow data
      setWorkflow(mockWorkflowData);
    }
  }, [mode, workflowId]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving workflow:", workflow);
      setIsLoading(false);
    }, 1000);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    const updatedWorkflow = { ...workflow, status: "active" as const };
    setWorkflow(updatedWorkflow);
    // Simulate API call
    setTimeout(() => {
      console.log("Publishing workflow:", updatedWorkflow);
      setIsLoading(false);
    }, 1000);
  };

  const addStep = (stepType: WorkflowStep["type"]) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      type: stepType,
      name: `New ${stepType} step`,
      config: {},
      position: {
        x: 200 + workflow.steps.length * 50,
        y: 200 + workflow.steps.length * 50,
      },
    };

    setWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, newStep],
    }));
    setSelectedStep(newStep.id);
    setShowStepLibrary(false);
  };

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === stepId ? { ...step, ...updates } : step
      ),
    }));
  };

  const deleteStep = (stepId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.filter((step) => step.id !== stepId),
      connections: prev.connections.filter(
        (conn) => conn.from !== stepId && conn.to !== stepId
      ),
    }));
    if (selectedStep === stepId) {
      setSelectedStep(null);
    }
  };

  const selectedStepData = workflow.steps.find(
    (step) => step.id === selectedStep
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/workflows">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Workflows
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {mode === "create" ? "Create New Workflow" : "Edit Workflow"}
                </h1>
                <p className="text-muted-foreground">
                  {mode === "create"
                    ? "Build your automated client onboarding process"
                    : "Modify your existing workflow"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant={workflow.status === "active" ? "default" : "secondary"}
              >
                {workflow.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} disabled={isLoading}>
                <Play className="h-4 w-4 mr-2" />
                {workflow.status === "active" ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Workflow Settings */}
        <div className="w-80 border-r bg-background p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Settings</CardTitle>
                <CardDescription>
                  Configure your workflow's basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Workflow Name</Label>
                  <Input
                    id="name"
                    value={workflow.name}
                    onChange={(e) =>
                      setWorkflow((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="e.g., Web Design Onboarding"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={workflow.description}
                    onChange={(e) =>
                      setWorkflow((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe what this workflow does"
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-start"
                    checked={workflow.status === "active"}
                    onCheckedChange={(checked) =>
                      setWorkflow((prev) => ({
                        ...prev,
                        status: checked ? "active" : "draft",
                      }))
                    }
                  />
                  <Label htmlFor="auto-start">Auto-start when published</Label>
                </div>
              </CardContent>
            </Card>

            {/* Step Library */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Steps</CardTitle>
                <CardDescription>
                  Drag or click to add workflow steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StepLibrary onAddStep={addStep} />
              </CardContent>
            </Card>

            {/* Workflow Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workflow Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Steps
                  </span>
                  <span className="font-medium">{workflow.steps.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Connections
                  </span>
                  <span className="font-medium">
                    {workflow.connections.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      workflow.status === "active" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {workflow.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <WorkflowCanvas
            workflow={workflow}
            selectedStep={selectedStep}
            onSelectStep={setSelectedStep}
            onUpdateStep={updateStep}
            onDeleteStep={deleteStep}
          />

          {/* Add Step Button */}
          <Button
            className="absolute bottom-6 left-6"
            onClick={() => setShowStepLibrary(!showStepLibrary)}
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>

        {/* Right Sidebar - Step Configuration */}
        {selectedStepData && (
          <div className="w-80 border-l bg-background p-6 overflow-y-auto">
            <StepConfigPanel
              step={selectedStepData}
              onUpdateStep={updateStep}
              onClose={() => setSelectedStep(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
