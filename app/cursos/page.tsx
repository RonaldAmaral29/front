"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"

interface Curso {
    id: number
    nome: string
    descricao: string
}

export default function CursosPage() {
    const [cursos, setCursos] = useState<Curso[]>([])
    const [loading, setLoading] = useState(true)

    // Formulário
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [editId, setEditId] = useState<number | null>(null)

    // Controla modal
    const [open, setOpen] = useState(false)

    // Buscar cursos do backend
    const fetchCursos = async () => {
        try {
            const res = await api.get("/cursos")
            setCursos(res.data)
        } catch (error) {
            toast.error("Erro ao carregar cursos.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCursos()
    }, [])

    // Abrir modal para criar
    const abrirCriar = () => {
        setEditId(null)
        setNome("")
        setDescricao("")
        setOpen(true)
    }

    // Abrir modal para editar
    const abrirEditar = (curso: Curso) => {
        setEditId(curso.id)
        setNome(curso.nome)
        setDescricao(curso.descricao ?? "")
        setOpen(true)
    }

    // Criar ou editar curso
    const salvarCurso = async () => {
        if (!nome.trim()) {
            toast.error("O nome é obrigatório.")
            return
        }

        try {
            if (editId === null) {
                await api.post("/cursos", { nome, descricao })
                toast.success("Curso criado!")
            } else {
                await api.put(`/cursos/${editId}`, { nome, descricao })
                toast.success("Curso atualizado!")
            }

            setOpen(false)
            fetchCursos()

        } catch (error) {
            toast.error("Erro ao salvar curso.")
        }
    }

    // Deletar curso
    const deletarCurso = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este curso?")) return

        try {
            await api.delete(`/cursos/${id}`)
            toast.success("Curso deletado!")
            fetchCursos()
        } catch (error) {
            toast.error("Erro ao deletar curso.")
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <Card className="max-w-4xl mx-auto shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Gerenciar Cursos</CardTitle>

                    <Button onClick={abrirCriar}>Novo Curso</Button>
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
                                    <TableHead>Descrição</TableHead>
                                    <TableHead className="w-32">Ações</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {cursos.map((curso) => (
                                    <TableRow key={curso.id}>
                                        <TableCell>{curso.id}</TableCell>
                                        <TableCell>{curso.nome}</TableCell>
                                        <TableCell>{curso.descricao}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => abrirEditar(curso)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deletarCurso(curso.id)}
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
                        <DialogTitle>{editId ? "Editar Curso" : "Novo Curso"}</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para continuar.
                        </DialogDescription>
                    </DialogHeader>


                    <div className="space-y-3">
                        <Input
                            placeholder="Nome do curso"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <Input
                            placeholder="Descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <Button className="w-full" onClick={salvarCurso}>
                            Salvar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
