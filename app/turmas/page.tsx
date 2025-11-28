"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"

interface Curso {
    id: number
    nome: string
}

interface Turma {
    id: number
    nome: string
    ano: number
    curso_id: number
    curso: {
        id: number
        nome: string
    }
}

export default function TurmasPage() {
    const [turmas, setTurmas] = useState<Turma[]>([])
    const [cursos, setCursos] = useState<Curso[]>([])

    const [loading, setLoading] = useState(true)

    // Formulário
    const [nome, setNome] = useState("")
    const [ano, setAno] = useState<number | "">("")
    const [cursoId, setCursoId] = useState<number | null>(null)

    const [editId, setEditId] = useState<number | null>(null)
    const [open, setOpen] = useState(false)

    // Buscar cursos (somente uma vez)
    const fetchCursos = async () => {
        try {
            const res = await api.get("/cursos/")
            setCursos(res.data)
        } catch (error) {
            toast.error("Erro ao carregar cursos.")
        }
    }

    // Buscar turmas
    const fetchTurmas = async () => {
        try {
            const res = await api.get("/turmas/")
            setTurmas(res.data)
        } catch (error) {
            toast.error("Erro ao carregar turmas.")
        } finally {
            setLoading(false)
        }
    }

    // Inicialização
    useEffect(() => {
        fetchCursos()
        fetchTurmas()
    }, [])

    // Abrir modal para criar
    const abrirCriar = () => {
        setEditId(null)
        setNome("")
        setAno("")
        setCursoId(null)
        setOpen(true)
    }

    // Abrir modal de edição
    const abrirEditar = (turma: Turma) => {
        setEditId(turma.id)
        setNome(turma.nome)
        setAno(turma.ano)
        setCursoId(turma.curso_id)
        setOpen(true)
    }

    // Criar ou editar turma
    const salvarTurma = async () => {
        if (!nome.trim()) return toast.error("Nome é obrigatório.")
        if (!ano) return toast.error("Ano é obrigatório.")
        if (!cursoId) return toast.error("Selecione um curso.")

        try {
            if (editId === null) {
                await api.post("/turmas/", {
                    nome,
                    ano,
                    curso_id: cursoId
                })
                toast.success("Turma criada!")
            } else {
                await api.put(`/turmas/${editId}/`, {
                    nome,
                    ano,
                    curso_id: cursoId
                })
                toast.success("Turma atualizada!")
            }

            setOpen(false)
            fetchTurmas()

        } catch (error) {
            toast.error("Erro ao salvar turma.")
        }
    }

    // Deletar turma
    const deletarTurma = async (id: number) => {
        if (!confirm("Deseja realmente excluir essa turma?")) return

        try {
            await api.delete(`/turmas/${id}/`)
            toast.success("Turma deletada!")
            fetchTurmas()
        } catch (error) {
            toast.error("Erro ao deletar turma.")
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <Card className="max-w-5xl mx-auto shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Gerenciar Turmas</CardTitle>

                    <Button onClick={abrirCriar}>Nova Turma</Button>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <p className="text-center text-gray-600">Carregando...</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Ano</TableHead>
                                    <TableHead>Curso</TableHead>
                                    <TableHead className="w-32">Ações</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {turmas.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{t.id}</TableCell>
                                        <TableCell>{t.nome}</TableCell>
                                        <TableCell>{t.ano}</TableCell>
                                        <TableCell>{t.curso?.nome}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => abrirEditar(t)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deletarTurma(t.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editId ? "Editar Turma" : "Nova Turma"}</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para continuar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">

                        <Input
                            placeholder="Nome da Turma"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <Input
                            type="number"
                            placeholder="Ano"
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                        />

                        {/* SELECT DE CURSOS */}
                        <Select onValueChange={(v) => setCursoId(Number(v))} value={cursoId?.toString() || ""}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um Curso" />
                            </SelectTrigger>
                            <SelectContent>
                                {cursos.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.nome}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button className="w-full" onClick={salvarTurma}>
                            Salvar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
