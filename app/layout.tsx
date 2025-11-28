"use client";

import "./globals.css";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Rotas que NÃO usam layout (página "crua")
  const noLayoutRoutes = ["/", "/login", "/sobre", "/comunicados"];

  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <html lang="pt-BR">
      <body className="bg-gray-50">
        {hideLayout ? (
          <>
            {children}
            <Toaster richColors closeButton />
          </>
        ) : (
          <div className="flex">
            {/* SIDEBAR */}
            <Sidebar open={sidebarOpen} />

            {/* ÁREA PRINCIPAL */}
            <div className="flex flex-col flex-1 min-h-screen">
              <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

              <main className="flex-1 p-6">{children}</main>

              <Toaster richColors closeButton />
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
