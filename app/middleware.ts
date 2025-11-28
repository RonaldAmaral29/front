import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || null;

    // rotas protegidas
    const protectedRoutes = [
        "/dashboard",
        "/cursos",
        "/turmas",
        "/professores",
        "/alunos",
        "/arquivos"
    ];

    if (protectedRoutes.some(r => req.nextUrl.pathname.startsWith(r))) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/cursos/:path*",
        "/turmas/:path*",
        "/professores/:path*",
        "/alunos/:path*",
        "/arquivos/:path*",
    ],
};
