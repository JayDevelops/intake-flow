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
import { Zap, LogOut, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">FlowStart</span>
          </Link>
          <h1 className="text-2xl font-bold text-secondary-foreground mb-2">
            Sign out
          </h1>
          <p className="text-gray-600">Are you sure you want to sign out?</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center space-y-1 pb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="h-8 w-8 text-color-error-60" />
            </div>
            <CardTitle className="text-xl">Sign out of your account</CardTitle>
            <CardDescription>
              You will be redirected to the home page after signing out
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Any unsaved changes will be lost. Make
                sure to save your work before signing out.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full h-11 bg hover:bg-red-700"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Yes, sign me out
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 bg-transparent"
                asChild
                disabled={isSigningOut}
              >
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel, take me back
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              href="/support"
              className="text-primary hover:text-primary/80"
            >
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
