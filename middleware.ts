export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    // Protect all paths EXCEPT:
    // - / (root)
    // - /api
    // - /_next/static
    // - /_next/image
    // - /favicon.ico
    "/((?!api|_next/static|_next/image|favicon.ico|$).*)",
  ],
};
