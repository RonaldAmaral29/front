"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"



export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await api.post("/auth/login", {
                email,
                senha,
            })

            localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

            toast.success("Login realizado com sucesso!")

            router.push("/dashboard")

        } catch (error: unknown) {

            // Trata erro do Axios de forma segura
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.erro || "Falha ao fazer login")
            } else {
                toast.error("Erro inesperado")
            }

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md shadow-sm">
                <CardHeader>
                    <CardTitle className="text-center">Acessar Sistema</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">E-mail</label>
                            <Input
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* SENHA */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Senha</label>
                            <Input
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        {/* BOTÃO */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>

                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Não tem conta? <span className="font-semibold">Fale com o administrador.</span>
                    </p>

                    <p className="text-center text-sm text-gray-600">
                        <a href="/recuperar" className="text-blue-600 hover:underline">
                            Esqueci minha senha
                        </a>
                    </p>
                </CardContent>
            </Card>
        </main>
    )
}
