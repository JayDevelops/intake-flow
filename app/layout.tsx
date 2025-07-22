import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "./(auth)/auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default:
      "IntakeFlow - Automate Client Onboarding for Freelancers & Agencies",
    template: "%s | IntakeFlow",
  },
  description:
    "Stop losing clients to slow onboarding. Automate your entire client intake process with branded forms, instant document delivery, and smart workflows. Reduce admin work by 70%.",
  keywords: [
    "client onboarding",
    "freelancer automation",
    "intake forms",
    "client management",
    "workflow automation",
    "small business tools",
  ],
  authors: [{ name: "IntakeFlow" }],
  creator: "IntakeFlow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intakeflow.com",
    title: "IntakeFlow - Automate Client Onboarding",
    description:
      "Reduce admin work by 70% with automated client onboarding workflows",
    siteName: "IntakeFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntakeFlow - Automate Client Onboarding",
    description:
      "Reduce admin work by 70% with automated client onboarding workflows",
    creator: "@intakeflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
