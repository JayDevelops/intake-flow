import FormPage from "@/components/FormPage";
import { Eye, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewFormPage() {
  return (
    <div>
      {/* Header */}
      <header className="bg-secondary border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                className="hidden md:inline"
                variant="outline"
                size="sm"
                asChild
              >
                <Link href="/dashboard" className="pt-1">
                  Back to Dashboard
                </Link>
              </Button>
              <div className="text-secondary-foreground">
                <h1 className="text-2xl font-bold">Create New Form</h1>
                <p className="text-muted-foreground">
                  Build your custom intake form
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Form
              </Button>
            </div>
          </div>
        </div>
      </header>
      <FormPage />
    </div>
  );
}
