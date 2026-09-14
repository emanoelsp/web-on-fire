import ModuleLanding, { type LandingGroup } from "@/components/ModuleLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Módulo 2.1 — Formulários & UX Profissional · Web On Fire Academy",
};

const groups: LandingGroup[] = [
  {
    label: "Aula 01",
    title: "Projeto Base & Estrutura",
    desc: "Criamos do zero o projeto FormFire — um sistema de cadastro de alunos com três rotas.",
    items: [
      {
        slug: "forms-aula-01",
        num: "01",
        title: "Projeto Base & Estrutura",
        desc: "npx create-next-app@latest, TypeScript puro, rotas /alunos, /alunos/[id] e /alunos/cadastro com dados mockados.",
        href: "/modulos/forms/aula-01",
        icon: "🏗️",
        duration: "~35 min",
        slides: 10,
      },
    ],
  },
  {
    label: "Aula 02",
    title: "Loading, Error & Not Found",
    desc: "Adicionamos os três arquivos de UX estrutural do Next.js ao projeto FormFire.",
    items: [
      {
        slug: "forms-aula-02",
        num: "02",
        title: "Loading, Error & Not Found",
        desc: "loading.tsx com skeleton, error.tsx com retry, not-found.tsx e notFound() no detalhe do aluno.",
        href: "/modulos/forms/aula-02",
        icon: "⏳",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 03",
    title: "Otimizações & Lazy Loading",
    desc: "Avatares com next/image, fontes sem piscada e modal de edição carregado sob demanda.",
    items: [
      {
        slug: "forms-aula-03",
        num: "03",
        title: "Otimizações & Lazy Loading",
        desc: "next/image com WebP automático, next/font sem Google Fonts em runtime e next/dynamic para modal pesado.",
        href: "/modulos/forms/aula-03",
        icon: "🚀",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 04",
    title: "Validação com Zod",
    desc: "Instalamos react-hook-form + Zod e protegemos o formulário de dados inválidos.",
    items: [
      {
        slug: "forms-aula-04",
        num: "04",
        title: "Validação com Zod",
        desc: "Schema z.object(), zodResolver, useForm, register, handleSubmit e mensagens de erro em PT-BR.",
        href: "/modulos/forms/aula-04",
        icon: "🛡️",
        duration: "~45 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 05",
    title: "Máscaras de Input",
    desc: "CPF, telefone e CEP com formatação automática integrada ao react-hook-form.",
    items: [
      {
        slug: "forms-aula-05",
        num: "05",
        title: "Máscaras de Input (react-imask)",
        desc: "IMaskInput para CPF (000.000.000-00), telefone e CEP, integrado via Controller ao react-hook-form.",
        href: "/modulos/forms/aula-05",
        icon: "🎭",
        duration: "~40 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Fechamento",
    title: "Desafio Final do Módulo",
    desc: "Entregue o FormFire completo: UX, otimizações, validação e máscaras funcionando juntos.",
    items: [
      {
        slug: "forms-desafio",
        num: "🏆",
        title: "Desafio — FormFire Completo",
        desc: "Sistema de cadastro de alunos com todas as camadas: UX estrutural, imagens otimizadas, validação Zod e máscaras de input.",
        href: "/modulos/forms/desafio",
        icon: "🏆",
        duration: "~90 min",
        slides: null,
        challenge: true,
      },
    ],
  },
];

export default function FormsModulePage() {
  return (
    <ModuleLanding
      moduleTag="módulo 2.1"
      badge="📋 Módulo 2.1 — Aulas 01 a 05"
      titleTop="FORMULÁRIOS &"
      titleBottom="UX PROFISSIONAL"
      description="Um projeto real construído aula a aula: começamos criando a estrutura, adicionamos UX estrutural (loading/error/not-found), otimizamos imagens e fontes, protegemos o formulário com Zod e finalizamos com máscaras de CPF, telefone e CEP."
      ctaHref="/modulos/forms/aula-01"
      ctaLabel="Começar pela Aula 01"
      stats={[
        { value: "5", label: "Aulas", fire: true },
        { value: "54", label: "Slides" },
        { value: "~3h30", label: "de conteúdo" },
        { value: "1", label: "Desafio final" },
      ]}
      tags={["Zod", "react-hook-form", "react-imask"]}
      groups={groups}
      trilhaHint="Cada aula expande o mesmo projeto FormFire — ao final, você entrega um cadastro completo e profissional 🏆"
    />
  );
}
