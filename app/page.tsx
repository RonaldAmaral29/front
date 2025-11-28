import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

      {/* HERO */}
      <section className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema Acadêmico — Backend & Frontend
        </h1>

        <p className="text-gray-600 text-lg">
          Um sistema moderno e completo para gerenciamento de cursos, turmas, professores,
          alunos, arquivos enviados e muito mais.
        </p>

        {/* BOTÕES */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link href="/login">
            <Button className="px-6">Entrar</Button>
          </Link>

          <Link href="/comunicados">
            <Button variant="outline" className="px-6">
              Comunicados
            </Button>
          </Link>
        </div>
      </section>

      {/* CARD DE DESTAQUE */}
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Sobre o Projeto</CardTitle>
          <CardDescription>
            Simples, organizado e completo — desenvolvido com Next.js, Flask e SQLite.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-gray-700 text-md">
          Este sistema integra um backend robusto com múltiplos CRUDs, validações,
          upload de arquivos e gerenciamento acadêmico completo.
          <br /><br />
          Clique em “Entrar” para acessar o dashboard ou explore os comunicados públicos.
        </CardContent>
      </Card>
    </main>
  )
}
