"use client";
import Assessment from "@/components/Assessment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import profileDone from "@/utils/profileDone";

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
    if(status === "authenticated") {
      const { isComplete } = profileDone(session.user.email);
      alert("Pls Fill Your Details First")
      if (!isComplete) {
          router.push("/profile");
      }
    }
  }, [status,session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  // console.log(session.user.mvrfy)
  // Render Dashboard if authenticated
  if (status === "authenticated") {
    return (
      <div>
        {console.log(session.user.mvrfy)}
        <Assessment />
      </div>
    );
  }

  return null;
};

export default Page;