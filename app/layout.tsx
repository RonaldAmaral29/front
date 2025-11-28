"use client";

import "./globals.css";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="pt-BR">
      <body className="flex bg-gray-100">

        {/* SIDEBAR */}
        <Sidebar open={sidebarOpen} />

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex flex-col min-h-screen flex-1">

          {/* HEADER */}
          <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* PÁGINA */}
          <main className="flex-1 p-6">{children}</main>

          {/* FOOTER */}
          {/* <Footer /> */}
        </div>

      </body>
    </html>
  );
}
