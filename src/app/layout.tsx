import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/contexts/socket-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Admin",
  description: "Sistema de administração de menu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="pt-BR">
        <body className={inter.className}>
          <SocketProvider>
            {children}
          </SocketProvider>
        </body>
      </html>
    );
  }