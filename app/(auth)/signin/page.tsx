"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Loader2, Zap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import providers from "@/components/signInProviders";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const error = searchParams?.get("error");
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

  const handleProviderSignIn = async (providerId: string) => {
    setIsLoading(providerId);

    // Simulate Auth.js signIn call
    // In real app: await signIn(providerId, { callbackUrl })
    setTimeout(() => {
      console.log(`Signing in with ${providerId}`);
      setIsLoading(null);
      // Redirect would happen here
    }, 2000);
  };

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthSignin":
        return "Error occurred during OAuth sign in. Please try again.";
      case "OAuthCallback":
        return "Error occurred during OAuth callback. Please try again.";
      case "OAuthCreateAccount":
        return "Could not create OAuth account. Please try again.";
      case "EmailCreateAccount":
        return "Could not create email account. Please try again.";
      case "Callback":
        return "Error occurred during callback. Please try again.";
      case "OAuthAccountNotLinked":
        return "Email already exists with different provider. Please sign in with your original provider.";
      case "EmailSignin":
        return "Check your email for the sign in link.";
      case "CredentialsSignin":
        return "Invalid credentials. Please check your email and password.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return error
          ? "An error occurred during sign in. Please try again."
          : null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-muted-foreground">
              FlowStart
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-secondary-foreground/80 mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground/90">
            Sign in to your account to continue
          </p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-center">
              Sign in to your account
            </CardTitle>
          </CardHeader>
          <CardContent className="-pt-12">
            <div className="space-y-3">
              {Object.values(providers)
                .filter((p) => p.type === "oauth")
                .map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <Button
                      key={provider.id}
                      variant="outline"
                      className={`w-full h-11 ${provider.bgColor} ${provider.textColor} ${provider.borderColor} border`}
                      onClick={() => provider.awaitSignIn(callbackUrl)}
                      disabled={isLoading !== null}
                    >
                      {isLoading === provider.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Icon className="h-4 w-4 mr-2" />
                      )}
                      Continue with {provider.name}
                    </Button>
                  );
                })}
            </div>
            {/* Footer Links */}
            <div className="text-center space-y-2 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Sign up
                </Link>
              </p>
              {showEmailForm && (
                <p className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary hover:text-primary/80"
                  >
                    Forgot your password?
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-muted-foreground/80"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
