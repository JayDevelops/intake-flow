"use client";

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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Mail,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Clock,
  GitBranch,
  Zap,
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

interface StepConfigPanelProps {
  step: WorkflowStep;
  onUpdateStep: (stepId: string, updates: Partial<WorkflowStep>) => void;
  onClose: () => void;
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

export default function StepConfigPanel({
  step,
  onUpdateStep,
  onClose,
}: StepConfigPanelProps) {
  const Icon = getStepIcon(step.type);

  const updateStepField = (field: string, value: any) => {
    onUpdateStep(step.id, { [field]: value });
  };

  const updateStepConfig = (configKey: string, value: any) => {
    onUpdateStep(step.id, {
      config: { ...step.config, [configKey]: value },
    });
  };

  const renderStepSpecificConfig = () => {
    switch (step.type) {
      case "form":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="form-template">Form Template</Label>
              <Select
                value={step.config.formId || ""}
                onValueChange={(value) => updateStepConfig("formId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a form template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intake-form-1">
                    Project Intake Form
                  </SelectItem>
                  <SelectItem value="discovery-form">
                    Discovery Questionnaire
                  </SelectItem>
                  <SelectItem value="content-brief">
                    Content Brief Form
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="required-form"
                checked={step.config.required || false}
                onCheckedChange={(checked) =>
                  updateStepConfig("required", checked)
                }
              />
              <Label htmlFor="required-form">Required step</Label>
            </div>
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-template">Email Template</Label>
              <Select
                value={step.config.templateId || ""}
                onValueChange={(value) => updateStepConfig("templateId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an email template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welcome-template">
                    Welcome Email
                  </SelectItem>
                  <SelectItem value="confirmation-template">
                    Confirmation Email
                  </SelectItem>
                  <SelectItem value="follow-up-template">
                    Follow-up Email
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="email-subject">Subject Line</Label>
              <Input
                id="email-subject"
                value={step.config.subject || ""}
                onChange={(e) => updateStepConfig("subject", e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div>
              <Label htmlFor="email-delay">Send Delay (minutes)</Label>
              <Input
                id="email-delay"
                type="number"
                value={step.config.delay || 0}
                onChange={(e) =>
                  updateStepConfig("delay", Number.parseInt(e.target.value))
                }
                placeholder="0"
              />
            </div>
          </div>
        );

      case "document":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="document-template">Document Template</Label>
              <Select
                value={step.config.documentId || ""}
                onValueChange={(value) => updateStepConfig("documentId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a document template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contract-template">
                    Service Contract
                  </SelectItem>
                  <SelectItem value="proposal-template">
                    Project Proposal
                  </SelectItem>
                  <SelectItem value="nda-template">NDA Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="require-signature"
                checked={step.config.requireSignature || false}
                onCheckedChange={(checked) =>
                  updateStepConfig("requireSignature", checked)
                }
              />
              <Label htmlFor="require-signature">Require signature</Label>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="payment-amount">Amount</Label>
              <Input
                id="payment-amount"
                type="number"
                value={step.config.amount || ""}
                onChange={(e) =>
                  updateStepConfig("amount", Number.parseFloat(e.target.value))
                }
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="payment-description">Description</Label>
              <Input
                id="payment-description"
                value={step.config.description || ""}
                onChange={(e) =>
                  updateStepConfig("description", e.target.value)
                }
                placeholder="Payment description"
              />
            </div>
            <div>
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select
                value={step.config.paymentType || ""}
                onValueChange={(value) =>
                  updateStepConfig("paymentType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="milestone">Milestone Payment</SelectItem>
                  <SelectItem value="final">Final Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="calendar-type">Meeting Type</Label>
              <Select
                value={step.config.meetingType || ""}
                onValueChange={(value) =>
                  updateStepConfig("meetingType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Discovery Call</SelectItem>
                  <SelectItem value="kickoff">Project Kickoff</SelectItem>
                  <SelectItem value="review">Review Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="calendar-duration">Duration (minutes)</Label>
              <Input
                id="calendar-duration"
                type="number"
                value={step.config.duration || 30}
                onChange={(e) =>
                  updateStepConfig("duration", Number.parseInt(e.target.value))
                }
                placeholder="30"
              />
            </div>
          </div>
        );

      case "delay":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="delay-amount">Delay Amount</Label>
              <Input
                id="delay-amount"
                type="number"
                value={step.config.delayAmount || 1}
                onChange={(e) =>
                  updateStepConfig(
                    "delayAmount",
                    Number.parseInt(e.target.value)
                  )
                }
                placeholder="1"
              />
            </div>
            <div>
              <Label htmlFor="delay-unit">Delay Unit</Label>
              <Select
                value={step.config.delayUnit || "hours"}
                onValueChange={(value) => updateStepConfig("delayUnit", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minutes">Minutes</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No specific configuration available for this step type.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Configure Step</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {step.type} step
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Basic Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Basic Settings</CardTitle>
          <CardDescription>
            Configure the basic properties of this step
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="step-name">Step Name</Label>
            <Input
              id="step-name"
              value={step.name}
              onChange={(e) => updateStepField("name", e.target.value)}
              placeholder="Enter step name"
            />
          </div>
          <div>
            <Label htmlFor="step-description">Description</Label>
            <Textarea
              id="step-description"
              value={step.description || ""}
              onChange={(e) => updateStepField("description", e.target.value)}
              placeholder="Describe what this step does"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Step-Specific Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Step Configuration</CardTitle>
          <CardDescription>
            Configure settings specific to this step type
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepSpecificConfig()}</CardContent>
      </Card>

      {/* Actions */}
      <div className="flex space-x-2">
        <Button onClick={onClose} className="flex-1">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
