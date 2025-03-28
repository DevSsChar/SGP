"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && session?.user?.mvrfy === false) {
      router.push("/mobile");
    }
  }, [status,session, router]);

  // Return a loading state until the session is determined
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Render Dashboard if authenticated
  if (status === "authenticated") {
    return (
      <div>
        <Profile />
      </div>
    );
  }

  return null;
};

export default Page;