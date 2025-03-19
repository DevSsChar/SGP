"use client";
import Dashboard from "@/components/Dashboard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    return <p>Loading...</p>;
  }

  // Render Dashboard if authenticated
  if (status === "authenticated") {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }

  return null;
};

export default Page;

