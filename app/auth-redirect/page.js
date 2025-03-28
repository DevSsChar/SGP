"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait while loading

    if (status === "unauthenticated") {
      router.push("/login"); // Not authenticated, go to login
      return;
    }

    if (status === "authenticated") {
      // Check mobile verification status
      if (session?.user?.mvrfy === true) {
        router.push("/profile"); // Mobile verified, go to profile
      } else {
        router.push("/mobile"); // Not verified, go to mobile verification
      }
    }
  }, [status, session, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}