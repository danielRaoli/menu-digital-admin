import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Admin",
  description: "Sistema de administração de menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <Providers><div className="flex h-screen">
          <Sidebar />
          <div className="flex w-full flex-col ">
            <Header />
            <main className="w-full rounded-lg p-6 bg-gray-100 ">
              {children}
            </main>
          </div>
        </div>
        </Providers>
        
      </body>
    </html>
  
  );
}
