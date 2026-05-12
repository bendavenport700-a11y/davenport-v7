import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtected(req)) auth().protect();
  },
  {
    authorizedParties: [
      "https://davenport.rentals",
      "https://www.davenport.rentals",
    ],
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
