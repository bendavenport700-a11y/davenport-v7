import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const ADMIN_EMAIL = "bendavenport700@gmail.com";
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (!isAdminRoute(req)) return;

  const authState = auth();
  const { userId, sessionClaims } = authState;

  console.log("[admin middleware] path=%s userId=%s email=%s",
    req.nextUrl.pathname,
    userId ?? "(none)",
    sessionClaims?.email ?? "(not in claims)"
  );

  // Email bypass: if Clerk session claims include the admin email, always allow.
  // Note: email is only present in sessionClaims if you've added it to the JWT
  // template in the Clerk dashboard (Sessions → Customize session token).
  if (sessionClaims?.email === ADMIN_EMAIL) {
    console.log("[admin middleware] email bypass granted");
    return;
  }

  // If signed in, let through — the page component enforces the email gate.
  if (userId) {
    console.log("[admin middleware] signed-in user allowed through");
    return;
  }

  // Not signed in — redirect to Clerk sign-in.
  console.log("[admin middleware] unauthenticated, redirecting to sign-in");
  authState.protect();
}, {
  authorizedParties: [
    "https://davenport.rentals",
    "https://www.davenport.rentals",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
