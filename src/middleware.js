import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/inventory(.*)",
    "/api/checkout(.*)",
    "/api/setup(.*)",
    "/shop(.*)",
    "/waitlist(.*)",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
