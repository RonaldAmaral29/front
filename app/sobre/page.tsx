import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <Card className="max-w-3xl w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sobre o Sistema Acadêmico</CardTitle>
          <CardDescription>
            Informações sobre o projeto e sua finalidade
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Este sistema acadêmico foi desenvolvido como parte da disciplina de Backend Development,
            integrando tecnologias modernas como <strong>Flask</strong>, <strong>SQLite</strong> e <strong>Next.js com shadcn/ui</strong>.
          </p>

          <p>
            A aplicação oferece uma arquitetura completa incluindo autenticação, gerenciamento de usuários,
            cursos, turmas, professores, alunos e upload de arquivos — tudo seguindo padrões REST,
            organização MVC e boas práticas de desenvolvimento.
          </p>

          <p>
            O objetivo principal é demonstrar a integração entre backend e frontend de forma clara,
            simples e eficiente, ao mesmo tempo em que proporciona uma experiência agradável ao usuário.
          </p>

          <p>
            O sistema também inclui três páginas públicas (Home, Comunicados e Sobre), conforme solicitado
            nos requisitos do projeto, antes da etapa de autenticação.
          </p>

          <p className="italic text-gray-600">
            Desenvolvido com foco em clareza, modularização e experiência do usuário.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
