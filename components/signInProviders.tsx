import { FcGoogle } from "react-icons/fc";
import { IconType } from "react-icons";
import { signIn } from "next-auth/react";

export type SignInProvider = {
  id: string;
  name: string;
  type: "oauth" | "email" | "credentials";
  icon: IconType;
  bgColor: string;
  textColor: string;
  borderColor: string;
  awaitSignIn: (callbackUrl: string) => Promise<void>;
};

//  Define handler separately
const handleGoogleSignIn = async (callbackUrl: string) => {
  try {
    await signIn("google", { callbackUrl });
  } catch (err) {
    console.error("Google sign-in failed", err);
  }
};

const providers: SignInProvider[] = [
  {
    id: "google",
    name: "Google",
    type: "oauth",
    icon: FcGoogle,
    bgColor: "bg-white",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    awaitSignIn: handleGoogleSignIn,
  },
];

export default providers;
