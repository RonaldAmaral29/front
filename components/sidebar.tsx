"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Users, GraduationCap, Folder, Home } from "lucide-react";

export function Sidebar({ open }: { open: boolean }) {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/cursos", label: "Cursos", icon: BookOpen },
        { href: "/turmas", label: "Turmas", icon: GraduationCap },
        { href: "/professores", label: "Professores", icon: Users },
        { href: "/alunos", label: "Alunos", icon: Users },
        { href: "/arquivos", label: "Arquivos", icon: Folder }
    ];

    return (
        <aside
            className={`
        fixed md:static top-0 left-0 z-40 
        h-screen md:h-screen 
        w-64 bg-white shadow-md 
        transition-transform
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
        >
            {/* Área do topo da sidebar (não deve ficar atrás do header) */}
            <div className="h-16 flex items-center px-4 font-bold text-lg border-b bg-white">
                Menu
            </div>

            <nav className="px-3 py-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
                {links.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-md transition
                ${active ? "bg-gray-200 font-medium" : "hover:bg-gray-100"}
              `}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
