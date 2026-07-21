import ModuleLanding, { type LandingGroup } from "@/components/ModuleLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Módulo 04 — Persistência de Dados e Backend as a Service · Web On Fire Academy",
};

const groups: LandingGroup[] = [
  {
    label: "Aula 14",
    title: "Identidade e Segurança",
    desc: "Firebase Auth, provedores e credenciais, proteção de rotas com Middleware.",
    items: [
      {
        slug: "dados-auth",
        num: "14",
        title: "Identidade e Segurança",
        desc: "BaaS, autenticação vs autorização, Firebase Auth (e-mail e Google) e Next.js Middleware.",
        href: "/modulos/dados/auth",
        icon: "🔐",
        duration: "~45 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 15",
    title: "Cloud Firestore (Leitura e Modelagem)",
    desc: "Banco NoSQL, coleções e documentos, operações de leitura integradas ao Módulo 02.",
    items: [
      {
        slug: "dados-firestore-leitura",
        num: "15",
        title: "Firestore — Leitura & Modelagem",
        desc: "Coleções, documentos, a regra de ouro do NoSQL, getDoc/getDocs, queries e onSnapshot.",
        href: "/modulos/dados/firestore-leitura",
        icon: "🗄️",
        duration: "~45 min",
        slides: 11,
      },
    ],
  },
  {
    label: "Aula 16",
    title: "Cloud Firestore (Escrita e Mutações)",
    desc: "Create, Update, Delete, consultas, filtros e Security Rules.",
    items: [
      {
        slug: "dados-firestore-escrita",
        num: "16",
        title: "Firestore — Escrita & CRUD",
        desc: "addDoc, setDoc, updateDoc, deleteDoc, increment atômico e Security Rules.",
        href: "/modulos/dados/firestore-escrita",
        icon: "✍️",
        duration: "~45 min",
        slides: 10,
      },
    ],
  },
  {
    label: "Aula 17",
    title: "Mutações Modernas com Server Actions",
    desc: "Substituindo rotas de API por Server Actions seguras, com validação no servidor.",
    items: [
      {
        slug: "dados-server-actions",
        num: "17",
        title: "Server Actions",
        desc: '"use server", <form action={fn}>, validação no servidor e revalidatePath.',
        href: "/modulos/dados/server-actions",
        icon: "⚙️",
        duration: "~45 min",
        slides: 10,
      },
    ],
  },
  {
    label: "Aula 18",
    title: "Deploy e Entrega",
    desc: "Publicação na Vercel, variáveis de ambiente e o app no ar — a entrega do software.",
    items: [
      {
        slug: "dados-deploy",
        num: "18",
        title: "Deploy e Entrega na Vercel",
        desc: "CI/CD com GitHub, variáveis de ambiente, checklist de publicação e o pós-deploy.",
        href: "/modulos/dados/deploy",
        icon: "🚀",
        duration: "~35 min",
        slides: 10,
      },
    ],
  },
  {
    label: "Fechamento",
    title: "Desafio Final do Módulo",
    desc: "Um software full-stack completo: auth, banco, mutações e deploy no ar.",
    items: [
      {
        slug: "dados-desafio",
        num: "🏆",
        title: "Desafio — Software Entregue",
        desc: "Junte tudo: Firebase Auth, Firestore (CRUD), Server Actions e deploy na Vercel num produto real e publicado.",
        href: "/modulos/dados/desafio",
        icon: "🏆",
        duration: "~150 min",
        slides: null,
        challenge: true,
      },
    ],
  },
];

export default function DadosModulePage() {
  return (
    <ModuleLanding
      moduleTag="módulo 04"
      badge="🔥 Módulo 04 — Aulas 14 a 18"
      titleTop="PERSISTÊNCIA DE DADOS"
      titleBottom="& BACKEND AS A SERVICE"
      description="Integração de serviços em nuvem com o Firebase e mutações de dados modernas, culminando na entrega do software: autenticação, Firestore (leitura e escrita), Server Actions e deploy em produção."
      ctaHref="/modulos/dados/auth"
      ctaLabel="Começar pela Aula 14"
      stats={[
        { value: "5", label: "Aulas", fire: true },
        { value: "52", label: "Slides" },
        { value: "~4h", label: "de conteúdo" },
        { value: "1", label: "Desafio final" },
      ]}
      tags={["Firebase Auth", "Firestore", "Server Actions"]}
      groups={groups}
      trilhaHint="Cada aula fecha com uma missão — e o módulo termina com o software no ar 🏆"
    />
  );
}
