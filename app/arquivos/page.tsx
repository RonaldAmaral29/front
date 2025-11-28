"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, Trash2, Download } from "lucide-react";

const API = "http://localhost:5000/arquivos";

interface Arquivo {
    id: number;
    nome: string;
    caminho: string;
}

export default function ArquivosPage() {
    const [arquivos, setArquivos] = useState<Arquivo[]>([]);
    const [file, setFile] = useState<File | null>(null);

    const carregarArquivos = async () => {
        const res = await axios.get(API);
        setArquivos(res.data);
    };

    useEffect(() => {
        carregarArquivos();
    }, []);

    const uploadArquivo = async () => {
        if (!file) return alert("Selecione um arquivo!");

        const formData = new FormData();
        formData.append("arquivo", file);

        await axios.post(API, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        setFile(null);
        carregarArquivos();
    };

    const deletarArquivo = async (id: number) => {
        if (!confirm("Excluir este arquivo?")) return;

        await axios.delete(`${API}/${id}`);
        carregarArquivos();
    };

    return (
        <main className="min-h-screen p-10 bg-gray-50">
            <Card className="max-w-4xl mx-auto">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Gerenciamento de Arquivos</CardTitle>
                </CardHeader>

                <CardContent>
                    {/* UPLOAD */}
                    <div className="flex gap-3 mb-6">
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <Button onClick={uploadArquivo}>
                            <Upload className="w-4 h-4 mr-2" />
                            Enviar
                        </Button>
                    </div>

                    {/* LISTAGEM */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead className="w-32 text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {arquivos.map((a) => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.nome}</TableCell>

                                    <TableCell className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                window.open(`${API}/download/${a.id}`)
                                            }
                                        >
                                            <Download className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deletarArquivo(a.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
