"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import OtpLogin from "@/components/otpLogin";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Return a loading state until the session is determined
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsla(221,83%,53%,1)]"></div>
      </div>
    );
  }

  // Render OTP Login if authenticated
  if (status === "authenticated") {
    return <OtpLogin />;
  }

  return null;
};

export default Page;