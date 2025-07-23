"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  GripVertical,
  Type,
  Mail,
  Phone,
  Calendar,
  FileText,
  DollarSign,
  LinkIcon,
} from "lucide-react";

interface FormField {
  id: string;
  type:
    | "text"
    | "email"
    | "phone"
    | "textarea"
    | "select"
    | "date"
    | "file"
    | "number";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export default function FormPage() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "1",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
    {
      id: "2",
      type: "email",
      label: "Email Address",
      placeholder: "your@email.com",
      required: true,
    },
  ]);

  const fieldTypes = [
    { value: "text", label: "Text Input", icon: Type },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
    { value: "textarea", label: "Long Text", icon: FileText },
    { value: "select", label: "Dropdown", icon: LinkIcon },
    { value: "date", label: "Date", icon: Calendar },
    { value: "file", label: "File Upload", icon: FileText },
    { value: "number", label: "Number", icon: DollarSign },
  ];

  const addField = (type: FormField["type"]) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
      placeholder: "",
      required: false,
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>
                  Configure your form&apos;s basic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g., Web Design Project Intake"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Tell clients what information you need and why"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Fields */}
            <Card>
              <CardHeader>
                <CardTitle>Form Fields</CardTitle>
                <CardDescription>
                  Drag to reorder, click to edit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 bg-secondary text-secondary-foreground"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="h-4 w-4 text-secondary-foreground cursor-move" />
                          <Badge variant="outline">{field.type}</Badge>
                          {field.required && (
                            <Badge variant="secondary">Required</Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(field.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Field Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) =>
                              updateField(field.id, { label: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Placeholder</Label>
                          <Input
                            value={field.placeholder || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                placeholder: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-3">
                        <Switch
                          checked={field.required}
                          onCheckedChange={(checked) =>
                            updateField(field.id, { required: checked })
                          }
                        />
                        <Label>Required field</Label>
                      </div>

                      {field.type === "select" && (
                        <div className="mt-3">
                          <Label>Options (one per line)</Label>
                          <Textarea
                            value={field.options?.join("\n") || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                options: e.target.value
                                  .split("\n")
                                  .filter(Boolean),
                              })
                            }
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Field Types Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Fields</CardTitle>
                <CardDescription>
                  Click to add a new field to your form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {fieldTypes.map((fieldType) => {
                    const Icon = fieldType.icon;
                    return (
                      <Button
                        key={fieldType.value}
                        variant="outline"
                        className="justify-start h-auto p-3 bg-transparent"
                        onClick={() =>
                          addField(fieldType.value as FormField["type"])
                        }
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{fieldType.label}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 p-4 bg-primary text-primary-foreground rounded-lg">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {formTitle || "Your Form Title"}
                    </h3>
                    <p className="text-sm text-muted">
                      {formDescription || "Form description will appear here"}
                    </p>
                  </div>

                  {fields.slice(0, 3).map((field) => (
                    <div key={field.id} className="space-y-1">
                      <Label className="text-xs">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                      <div className="h-8 bg-secondary border rounded px-2 flex items-center">
                        <span className="text-xs text-secondary-foreground">
                          {field.placeholder ||
                            `Enter ${field.label.toLowerCase()}`}
                        </span>
                      </div>
                    </div>
                  ))}

                  {fields.length > 3 && (
                    <p className="text-xs text-muted-f">
                      +{fields.length - 3} more fields...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
