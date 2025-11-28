"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"

interface Professor {
    id: number
    especialidade: string
    usuario: {
        id: number
        nome: string
        email: string
    }
}

export default function ProfessoresPage() {
    const [professores, setProfessores] = useState<Professor[]>([])
    const [loading, setLoading] = useState(true)

    // Campos do formulário
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [especialidade, setEspecialidade] = useState("")

    const [editId, setEditId] = useState<number | null>(null)
    const [open, setOpen] = useState(false)

    // Buscar professores
    const fetchProfessores = async () => {
        try {
            const res = await api.get("/professores/")
            setProfessores(res.data)
        } catch (error) {
            toast.error("Erro ao carregar professores.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProfessores()
    }, [])

    // Abrir modal para criar
    const abrirCriar = () => {
        setEditId(null)
        setNome("")
        setEmail("")
        setSenha("")
        setEspecialidade("")
        setOpen(true)
    }

    // Abrir modal para editar
    const abrirEditar = (prof: Professor) => {
        setEditId(prof.id)
        setNome(prof.usuario.nome)
        setEmail(prof.usuario.email)
        setSenha("") // senha nunca vem predefinida
        setEspecialidade(prof.especialidade)
        setOpen(true)
    }

    // Criar ou editar professor
    const salvarProfessor = async () => {
        if (!nome.trim()) return toast.error("Nome é obrigatório.")
        if (!email.trim()) return toast.error("Email é obrigatório.")
        if (!especialidade.trim()) return toast.error("Especialidade é obrigatória.")

        try {
            if (editId === null) {
                // Criar professor + usuário
                await api.post("/professores/", {
                    nome,
                    email,
                    senha,
                    especialidade
                })
                toast.success("Professor criado!")
            } else {
                // Atualizar professor
                await api.put(`/professores/${editId}/`, {
                    nome,
                    email,
                    senha: senha || undefined,
                    especialidade
                })
                toast.success("Professor atualizado!")
            }

            setOpen(false)
            fetchProfessores()
        } catch (error) {
            toast.error("Erro ao salvar professor.")
        }
    }

    // Deletar professor
    const deletarProfessor = async (id: number) => {
        if (!confirm("Deseja realmente excluir este professor?")) return

        try {
            await api.delete(`/professores/${id}/`)
            toast.success("Professor deletado!")
            fetchProfessores()
        } catch (error) {
            toast.error("Erro ao deletar professor.")
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <Card className="max-w-5xl mx-auto shadow-sm">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Gerenciar Professores</CardTitle>

                    <Button onClick={abrirCriar}>Novo Professor</Button>
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
                                    <TableHead>Email</TableHead>
                                    <TableHead>Especialidade</TableHead>
                                    <TableHead className="w-32">Ações</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {professores.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.id}</TableCell>
                                        <TableCell>{p.usuario.nome}</TableCell>
                                        <TableCell>{p.usuario.email}</TableCell>
                                        <TableCell>{p.especialidade}</TableCell>

                                        <TableCell className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => abrirEditar(p)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => deletarProfessor(p.id)}
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
                        <DialogTitle>{editId ? "Editar Professor" : "Novo Professor"}</DialogTitle>
                        <DialogDescription>
                            Preencha os dados abaixo para continuar.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3">

                        <Input
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <Input
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <Input
                            placeholder="Especialidade"
                            value={especialidade}
                            onChange={(e) => setEspecialidade(e.target.value)}
                        />

                        <Button className="w-full" onClick={salvarProfessor}>
                            Salvar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
