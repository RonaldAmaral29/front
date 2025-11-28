"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="font-bold text-xl">Sistema Escolar</h1>
      </div>
    </header>
  );
}
