"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    Users,
    GraduationCap,
    GridIcon,
    Upload,
    Bell
} from "lucide-react";

interface Totais {
    total_cursos: number;
    total_turmas: number;
    total_professores: number;
    total_alunos: number;
    total_disciplinas: number;
    total_arquivos: number;
    total_comunicados: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [totais, setTotais] = useState<Totais | null>(null);

    useEffect(() => {
        axios.get("http://localhost:5000/dashboard")
            .then(res => setTotais(res.data))
            .catch(() => console.log("Erro ao carregar totais"));
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12">

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <Button variant="destructive">
                    Sair
                </Button>
            </div>

            {/* GRID DE TOTAIS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Cursos</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_cursos ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Turmas</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_turmas ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Professores</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_professores ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Alunos</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_alunos ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Disciplinas</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_disciplinas ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Arquivos</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_arquivos ?? "..."}
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader><CardTitle>Comunicados</CardTitle></CardHeader>
                    <CardContent className="text-4xl font-bold">
                        {totais?.total_comunicados ?? "..."}
                    </CardContent>
                </Card>

            </div>

        </main>
    );
}
