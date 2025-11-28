"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { api } from "@/lib/api"
import { Loader2 } from "lucide-react"

interface Comunicado {
    id: number
    titulo: string
    conteudo: string
    data_publicacao: string
}

export default function ComunicadosPage() {
    const [comunicados, setComunicados] = useState<Comunicado[]>([])
    const [loading, setLoading] = useState(true)

    // Busca os comunicados do backend
    const fetchComunicados = async () => {
        try {
            const res = await api.get("/comunicados")
            setComunicados(res.data)
        } catch (error) {
            console.error("Erro ao carregar comunicados:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComunicados()
    }, [])

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-6">
            <h1 className="text-3xl font-bold text-center mb-10">Comunicados</h1>

            {loading ? (
                <div className="flex justify-center mt-20">
                    <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
                </div>
            ) : comunicados.length === 0 ? (
                <p className="text-center text-gray-600">Nenhum comunicado encontrado.</p>
            ) : (
                <div className="grid gap-6 max-w-4xl mx-auto">
                    {comunicados.map((c) => (
                        <Card key={c.id} className="shadow-sm">
                            <CardHeader>
                                <CardTitle>{c.titulo}</CardTitle>
                                <CardDescription>
                                    {c.data_publicacao ? new Date(c.data_publicacao).toLocaleDateString("pt-BR") : "Sem data"}
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                    {c.conteudo}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </main>
    )
}
