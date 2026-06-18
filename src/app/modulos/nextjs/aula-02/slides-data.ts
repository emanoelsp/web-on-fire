import type { Slide } from "@/types/slides";

export const AULA02_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Aula 02",
    title: "APP ROUTER\n& ROTEAMENTO",
    subtitle: "No Next.js, a estrutura de pastas é o seu GPS.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Conceito",
    title: "Rotas = Pastas",
    items: [
      { icon: "📁", text: "app/page.tsx → rota \"/\" (raiz do site)" },
      { icon: "📁", text: "app/sobre/page.tsx → rota \"/sobre\"" },
      { icon: "📁", text: "app/produtos/page.tsx → rota \"/produtos\"" },
      { icon: "💡", text: "Regra: toda pasta com um page.tsx vira uma rota acessível pelo browser." },
    ],
    tip: "Você não configura rotas em nenhum arquivo separado. A estrutura de pastas é o roteador.",
  },
  {
    id: 3,
    type: "files",
    tag: "Na prática",
    title: "Estrutura de rotas na prática",
    codeLabel: "app/ — cada pasta é uma rota",
    code: `📁 src/app/
  📄 page.tsx              → /
  📁 sobre/
    📄 page.tsx            → /sobre
  📁 produtos/
    📄 page.tsx            → /produtos
    📁 [id]/
      📄 page.tsx          → /produtos/123 (dinâmica)
  📁 blog/
    📁 [slug]/
      📄 page.tsx          → /blog/meu-post (dinâmica)
    📁 [...path]/
      📄 page.tsx          → /blog/a/b/c (catch-all)
  📁 (marketing)/          → NÃO vira rota (grupo)
    📁 landing/
      📄 page.tsx          → /landing
  📁 (auth)/               → NÃO vira rota (grupo)
    📁 login/
      📄 page.tsx          → /login`,
  },
  {
    id: 4,
    type: "concept",
    tag: "Tipos de segmentos",
    title: "Quatro tipos de rota",
    items: [
      { icon: "🔒", text: "Estático: /produtos — URL fixa, sempre a mesma página." },
      { icon: "🔄", text: "Dinâmico [id]: /produtos/123 — o valor muda, a lógica é a mesma." },
      { icon: "🌊", text: "Catch-all [...path]: /docs/a/b/c — captura múltiplos segmentos numa array." },
      { icon: "📂", text: "Grupo (marketing): não afeta a URL, apenas organiza pastas sem criar rota nova." },
    ],
  },
  {
    id: 5,
    type: "code",
    tag: "Rotas dinâmicas",
    title: "Acessando params da rota",
    codeLabel: "src/app/produtos/[id]/page.tsx",
    tip: "No Next.js 15+, params é uma Promise — use await antes de acessar os valores.",
    code: `// A pasta [id] captura qualquer valor na URL
// /produtos/42 → params.id === "42"
// /produtos/camiseta → params.id === "camiseta"

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // await obrigatório no Next.js 15+

  const produto = await fetch(\`/api/produtos/\${id}\`).then(r => r.json());

  return (
    <main>
      <h1>{produto.nome}</h1>
      <p>ID: {id}</p>
    </main>
  );
}

// Gera rotas estáticas em build time (opcional, para SSG)
export async function generateStaticParams() {
  const produtos = await fetch('/api/produtos').then(r => r.json());
  return produtos.map((p: { id: string }) => ({ id: p.id }));
}`,
  },
  {
    id: 6,
    type: "concept",
    tag: "Route Groups",
    title: "Organizando sem poluir a URL",
    items: [
      { icon: "📂", text: "(auth)/login/page.tsx → URL: /login (sem o \"auth\" na URL)" },
      { icon: "📂", text: "(dashboard)/overview/page.tsx → URL: /overview" },
      { icon: "🎯", text: "Use grupos para organizar features sem afetar a URL pública." },
      { icon: "🔧", text: "Cada grupo pode ter seu próprio layout.tsx — ótimo para layouts de auth vs dashboard." },
    ],
    tip: "Parênteses na pasta = grupo. O Next.js ignora o nome na URL mas mantém na estrutura de arquivos.",
  },
  {
    id: 7,
    type: "code",
    tag: "Layouts",
    title: "Layouts compartilhados",
    codeLabel: "src/app/dashboard/layout.tsx",
    tip: "O layout.tsx persiste entre navegações dentro da mesma pasta — ele não re-renderiza quando você troca de página.",
    code: `// Layout global — envolve TODAS as páginas do app
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>  {/* cada page.tsx aparece aqui */}
        <Footer />
      </body>
    </html>
  );
}

// Layout do dashboard — envolve só /dashboard/*
// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}`,
  },
  {
    id: 8,
    type: "comparison",
    tag: "Navegação",
    title: "Link vs useRouter — quando usar cada um",
    left: {
      label: "<Link>",
      items: [
        "Navegação declarativa em JSX",
        "Prefetch automático ao hover",
        "SEO-friendly (tag <a> real)",
        "Recomendado na maioria dos casos",
        "<Link href=\"/sobre\">Sobre</Link>",
      ],
    },
    right: {
      label: "useRouter",
      items: [
        "Navegação programática",
        "Disparada por eventos/lógica",
        "Após submit de formulário",
        "Após operações assíncronas",
        "router.push('/dashboard')",
      ],
    },
    tip: "Regra: prefira <Link>. Use useRouter só quando a navegação depende de lógica (ex: redirecionar após login).",
  },
  {
    id: 9,
    type: "code",
    tag: "Exemplo completo",
    title: "Link, useRouter e usePathname",
    codeLabel: "src/components/Navbar.tsx",
    code: `"use client"; // useRouter e usePathname precisam do client
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // rota atual

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login"); // navegação programática
  }

  return (
    <nav>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          style={{
            fontWeight: pathname === l.href ? "bold" : "normal",
          }}
        >
          {l.label}
        </Link>
      ))}
      <button onClick={handleLogout}>Sair</button>
    </nav>
  );
}`,
  },
  {
    id: 10,
    type: "concept",
    tag: "searchParams",
    title: "Parâmetros de busca e filtros",
    items: [
      { icon: "🔍", text: "URL: /produtos?categoria=eletronicos&ordem=preco" },
      { icon: "🖥️", text: "Server: acesse via prop searchParams na page.tsx — vem como Promise no Next.js 15+." },
      { icon: "🌐", text: "Client: use o hook useSearchParams() de next/navigation." },
      { icon: "🔄", text: "Atualizar filtros: router.push com URLSearchParams ou o hook useSearchParams + router.replace." },
    ],
    tip: "searchParams não faz parte do sistema de rotas — são apenas query strings da URL. Ideal para filtros, buscas e paginação.",
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 02",
    title: "ROTEAMENTO\nNA PRÁTICA",
    subtitle: "Monte uma estrutura de rotas real",
    tasks: [
      "Crie a rota /blog com uma lista de 3 posts fictícios",
      "Crie /blog/[slug]/page.tsx para exibir um post pelo slug",
      "Passe o slug como título da página",
      "Use <Link> para navegar da lista para o post",
      "Crie um layout.tsx para /blog com um header exclusivo",
    ],
    bonus: [
      "Adicione searchParams para filtrar posts por categoria",
      "Use notFound() quando o slug não existir",
      "Adicione metadata dinâmica com o título do post",
    ],
    nextHref: "/modulos/nextjs/aula-03",
    nextLabel: "Aula 03: Server vs Client →",
  },
];
