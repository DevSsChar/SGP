"use client";
import Recommendations from "@/components/Recommendations";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileDone } from "@/utils/profileDone";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileChecked, setProfileChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (status === "unauthenticated") {
        router.push("/login");
        return;
      }
      
      if (status === "authenticated" && session?.user?.mvrfy === false) {
        router.push("/mobile");
        return;
      }
      
      if (status === "authenticated" && !profileChecked) {
        const result = await profileDone(session.user.email);
        console.log("Profile check result:", result);
        if (!result.isComplete) {
          alert("Please fill your details first");
          router.push("/profile");
        }
        setProfileChecked(true);
      }
    };
    
    checkAuth();
  }, [status, session, router, profileChecked]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  
  if (status === "authenticated" && profileChecked) {
    return (
      <div>
        <Recommendations />
      </div>
    );
  }

  return <p>Checking profile...</p>;
};

export default Page;