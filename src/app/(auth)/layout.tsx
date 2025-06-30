"use client"
import "../globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Providers from "@/components/providers";
import { getToken, isTokenExpired, removeToken } from "@/utils/jwt";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      removeToken();
      router.replace('/login');
    }
  }, [router]);

  return (

        <Providers>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex w-full flex-col">
              <Header />
              <main className="w-full rounded-lg p-6 bg-gray-100">
                {children}
              </main>
            </div>
          </div>
        </Providers>

  );
}