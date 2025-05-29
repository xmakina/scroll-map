"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface WithAuthProps {
  children: ReactNode;
}

export function WithAuth({ children }: WithAuthProps) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Handle the loading state
    if (status === "loading") return;
    // Redirect if not authenticated
    if (status === "unauthenticated") {
      if (pathname !== "/") {
        return router.push("/");
      }
    }
  }, [status, pathname, router]);

  const showContent = status === "authenticated" || pathname === "/";

  return showContent ? children : <div>Loading...</div>;
}
