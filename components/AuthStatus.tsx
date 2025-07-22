import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const AuthStatus = () => {
  const { status, data: session } = useSession();

  //  If the user is loading into the session, then return no component
  if (status === "loading")
    return <Skeleton className="h-12 w-12 rounded-full" />;

  //  If no user is logged in, return login component
  if (status === "unauthenticated") {
    return (
      <Button
        variant="outline"
        className="border-primary-600 text-primary-600 hover:bg-primary-50 bg-transparent"
        asChild
      >
        <Link href={"/signin"}>Sign In</Link>
      </Button>
    );
  }

  //  Default renders the user details and logout component
  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={session?.user?.image ?? ""}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <User className="mr-2 h-4 w-4" />
            {session?.user?.email ?? ""}
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/signout">
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AuthStatus;
