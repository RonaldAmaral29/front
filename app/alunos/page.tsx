"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";

const API = "http://localhost:5000/alunos";

interface Aluno {
    id: number;
    data_nascimento: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
    };
}

export default function AlunosPage() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [open, setOpen] = useState(false);
    const [editando, setEditando] = useState<Aluno | null>(null);

    // FORM STATES
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");

    // ---------------------------------------------
    // LOAD ALUNOS
    // ---------------------------------------------
    const loadAlunos = async () => {
        const res = await axios.get(API);
        setAlunos(res.data);
    };

    useEffect(() => {
        const fetch = async () => {
            await loadAlunos();
        };
        fetch();
    }, []);

    // ---------------------------------------------
    // NOVO ALUNO
    // ---------------------------------------------
    const novoAluno = () => {
        setEditando(null);
        setNome("");
        setEmail("");
        setSenha("");
        setDataNascimento("");
        setOpen(true);
    };

    // ---------------------------------------------
    // EDITAR ALUNO
    // ---------------------------------------------
    const editarAluno = (a: Aluno) => {
        setEditando(a);
        setNome(a.usuario.nome);
        setEmail(a.usuario.email);
        setSenha(""); // senha é opcional na edição
        setDataNascimento(a.data_nascimento);
        setOpen(true);
    };

    // ---------------------------------------------
    // SALVAR (Criar ou Editar)
    // ---------------------------------------------
    const salvar = async () => {
        try {
            if (editando) {
                // EDITANDO
                await axios.put(`${API}/${editando.id}`, {
                    nome,
                    email,
                    senha: senha || undefined,
                    data_nascimento: dataNascimento
                });
            } else {
                // CRIANDO
                await axios.post(API, {
                    nome,
                    email,
                    senha,
                    data_nascimento: dataNascimento
                });
            }

            setOpen(false);
            loadAlunos();
        } catch (e) {
            alert("Erro ao salvar aluno.");
        }
    };

    // ---------------------------------------------
    // EXCLUIR
    // ---------------------------------------------
    const deletar = async (id: number) => {
        if (!confirm("Deseja realmente excluir este aluno?")) return;

        await axios.delete(`${API}/${id}`);
        loadAlunos();
    };

    return (
        <main className="min-h-screen p-10 bg-gray-50">
            <Card className="max-w-5xl mx-auto shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle className="text-2xl">Alunos</CardTitle>
                    <Button onClick={novoAluno}>Novo Aluno</Button>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Data de Nascimento</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {alunos.map((a) => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.usuario.nome}</TableCell>
                                    <TableCell>{a.usuario.email}</TableCell>
                                    <TableCell>
                                        {new Date(a.data_nascimento).toLocaleDateString("pt-BR")}
                                    </TableCell>

                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => editarAluno(a)}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deletar(a.id)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editando ? "Editar Aluno" : "Novo Aluno"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">

                        {/* Nome */}
                        <div className="grid gap-1">
                            <Label>Nome</Label>
                            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>

                        {/* Email */}
                        <div className="grid gap-1">
                            <Label>Email</Label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* Senha */}
                        {!editando && (
                            <div className="grid gap-1">
                                <Label>Senha</Label>
                                <Input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Data de nascimento */}
                        <div className="grid gap-1">
                            <Label>Data de Nascimento</Label>
                            <Input
                                type="date"
                                value={dataNascimento}
                                onChange={(e) => setDataNascimento(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={salvar}>
                            {editando ? "Salvar Alterações" : "Criar Aluno"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
