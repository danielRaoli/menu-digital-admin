// hooks/useAuthRedirect.ts
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isTokenExpired } from "@/utils/jwt";

export function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);
}