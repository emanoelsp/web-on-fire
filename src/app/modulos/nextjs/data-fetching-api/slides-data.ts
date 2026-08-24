import type { Slide } from "@/types/slides";

export const DATA_FETCHING_API_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 02 · Aula 04 · P2",
    title: "DE MOCK DATA\nPARA API\nROUTES",
    subtitle: "O mock funcionou. Agora vamos expor esses dados como uma API de verdade.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O próximo passo",
    title: "Por que evoluir do mock para uma API Route?",
    items: [
      { icon: "🌐", text: "API Route = endpoint HTTP real. Qualquer cliente (browser, app mobile, outro servidor) pode consumir." },
      { icon: "🔌", text: "Desacopla o dado da página: a interface não sabe se o dado vem do mock, do Firestore ou de um banco externo." },
      { icon: "🛡️", text: "Centraliza validação, autenticação e lógica de negócio em um único lugar — não espalhada nas páginas." },
      { icon: "🔄", text: "Troca a fonte de dados (mock → banco real) sem tocar na interface. Só muda o handler." },
    ],
    tip: "Mock data foi o rascunho. A API Route é o contrato — estável para quem consome, flexível para quem implementa.",
  },
  {
    id: 3,
    type: "files",
    tag: "Anatomia",
    title: "Route Handler: a estrutura",
    codeLabel: "app/api/ — cada pasta é um endpoint",
    code: `📁 src/app/api/
  📁 produtos/
    📄 route.ts            → GET /api/produtos
    📁 [id]/
      📄 route.ts          → GET /api/produtos/123
  📁 clientes/
    📄 route.ts            → GET /api/clientes
    📁 [id]/
      📄 route.ts          → GET /api/clientes/456

// Regras:
// • Arquivo obrigatório: route.ts  (não page.tsx)
// • Exporta funções nomeadas: GET, POST, PUT, DELETE, PATCH
// • Roda no servidor — nunca exposto ao browser
// • Pode acessar banco, env vars, segredos com segurança`,
    tip: "A mesma convenção de pastas do App Router, mas o arquivo chave é route.ts, não page.tsx.",
  },
  {
    id: 4,
    type: "code",
    tag: "GET /api/produtos",
    title: "Expondo o mock como API",
    codeLabel: "src/app/api/produtos/route.ts",
    code: `import { NextResponse } from "next/server";
import { PRODUTOS_MOCK } from "@/lib/mocks";

export async function GET() {
  // Futuramente: return await db.produtos.findMany()
  return NextResponse.json(PRODUTOS_MOCK);
}

// Resultado no browser: GET /api/produtos
// [
//   { "id": 1, "nome": "Camiseta On Fire", "preco": 79.9, ... },
//   { "id": 2, "nome": "Caneca do Dev",    "preco": 39.9, ... },
//   { "id": 3, "nome": "Adesivo Event Loop","preco":  9.9, ... }
// ]`,
    tip: "NextResponse.json() serializa o objeto e define Content-Type: application/json automaticamente. Sem Express, sem boilerplate.",
  },
  {
    id: 5,
    type: "code",
    tag: "GET /api/produtos/[id]",
    title: "Rota dinâmica com parâmetro",
    codeLabel: "src/app/api/produtos/[id]/route.ts",
    code: `import { NextResponse } from "next/server";
import { PRODUTOS_MOCK } from "@/lib/mocks";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;

  const produto = PRODUTOS_MOCK.find((p) => p.id === Number(id));

  if (!produto) {
    return NextResponse.json(
      { error: "Produto não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(produto);
}

// GET /api/produtos/1  → 200 + { id:1, nome: "Camiseta On Fire", ... }
// GET /api/produtos/99 → 404 + { error: "Produto não encontrado" }`,
    tip: "Status 404 explícito é importante — quem consome a API precisa saber a diferença entre 'vazio' e 'não existe'.",
  },
  {
    id: 6,
    type: "code",
    tag: "GET /api/clientes",
    title: "Nova entidade: Clientes",
    codeLabel: "src/types/cliente.ts + src/lib/mocks.ts + src/app/api/clientes/route.ts",
    code: `// src/types/cliente.ts
export interface Cliente {
  id: number;
  nome: string;
  email: string;
  plano: "free" | "pro" | "enterprise";
}

// src/lib/mocks.ts — adicionar ao arquivo existente
export const CLIENTES_MOCK: Cliente[] = [
  { id: 1, nome: "Ana Lima",    email: "ana@email.com",    plano: "pro" },
  { id: 2, nome: "Bruno Costa", email: "bruno@email.com",  plano: "free" },
  { id: 3, nome: "Carla Dias",  email: "carla@email.com",  plano: "enterprise" },
];

// src/app/api/clientes/route.ts
import { NextResponse } from "next/server";
import { CLIENTES_MOCK } from "@/lib/mocks";

export async function GET() {
  return NextResponse.json(CLIENTES_MOCK);
}`,
    tip: "Um arquivo de mocks, múltiplas entidades exportadas. O padrão é o mesmo — só muda a interface e os dados.",
  },
  {
    id: 7,
    type: "comparison",
    tag: "Decisão",
    title: "Server Component direto vs API Route",
    left: {
      label: "Server Component direto",
      items: [
        "await getProdutos() dentro da página",
        "Dado vai direto pro HTML",
        "Zero request HTTP extra",
        "Ideal: dado só usado nessa página",
        "Mais simples, menos camadas",
      ],
    },
    right: {
      label: "API Route",
      items: [
        "fetch('/api/produtos') da página",
        "Dado servido como JSON",
        "Um request HTTP a mais",
        "Ideal: dado usado por múltiplos clientes",
        "Necessário: apps mobile, terceiros, webhooks",
      ],
    },
    tip: "Regra prática: se só sua página usa, acesse o dado direto. Se outros vão consumir, crie a API Route.",
  },
  {
    id: 8,
    type: "architecture",
    tag: "Fluxo completo",
    title: "Do browser ao JSON e de volta",
    subtitle: "O ciclo completo com API Routes",
    steps: [
      { icon: "🌐", text: "Browser acessa /loja — Next.js renderiza o Server Component" },
      { icon: "📡", text: "Server Component chama fetch('/api/produtos') — request interno no servidor" },
      { icon: "🔀", text: "Route Handler /api/produtos/route.ts executa e retorna NextResponse.json(PRODUTOS_MOCK)" },
      { icon: "📦", text: "Server Component recebe o JSON, renderiza o HTML com os dados" },
      { icon: "✅", text: "Browser recebe HTML pronto — sem spinner, sem request extra do cliente" },
    ],
    tip: "O fetch interno (server → api route) é resolvido localmente pelo Next.js, sem passar pela rede externa.",
  },
  {
    id: 9,
    type: "code",
    tag: "Consumindo",
    title: "Página consumindo a própria API",
    codeLabel: "src/app/loja/page.tsx",
    code: `import type { Produto } from "@/types/produto";

export default async function LojaPage() {
  // fetch para a própria API — funciona em Server Component
  const res = await fetch("http://localhost:3000/api/produtos", {
    cache: "no-store", // sempre fresco durante o dev
  });
  const produtos: Produto[] = await res.json();

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>Loja ({produtos.length} produtos)</h1>
      <ul style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(3,1fr)" }}>
        {produtos.map((p) => (
          <li key={p.id} style={{ border: "1px solid #333", borderRadius: 8, padding: "1rem" }}>
            <strong>{p.nome}</strong>
            <p>R$ {p.preco.toFixed(2)}</p>
            <span>{p.categoria}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}`,
    tip: "Em produção, use a URL absoluta via env var (process.env.NEXT_PUBLIC_URL) ou acesse o service diretamente sem o fetch.",
  },
  {
    id: 10,
    type: "concept",
    tag: "Boas práticas",
    title: "Checklist do Route Handler",
    items: [
      { icon: "✅", text: "Sempre retorne NextResponse.json() — define Content-Type correto e serializa automaticamente." },
      { icon: "✅", text: "Use status codes semânticos: 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Server Error." },
      { icon: "✅", text: "Tipe a resposta com sua interface — sem tipo, o consumidor fica no escuro." },
      { icon: "✅", text: "Valide o parâmetro antes de usar: Number(id) pode ser NaN se vier string inválida." },
      { icon: "❌", text: "Nunca exponha segredos na resposta (senhas, tokens) — a API é pública." },
      { icon: "❌", text: "Não faça lógica pesada dentro do handler — extraia para uma função de serviço." },
    ],
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 04 · P2",
    title: "MOCK DATA\nVIRA API",
    subtitle: "Transforme seus mocks em endpoints HTTP reais",
    tasks: [
      "Crie src/app/api/produtos/route.ts retornando PRODUTOS_MOCK via NextResponse.json()",
      "Crie src/app/api/produtos/[id]/route.ts — retorne 404 com { error: '...' } se o id não existir",
      "Crie a interface Cliente em src/types e CLIENTES_MOCK em src/lib/mocks.ts",
      "Crie src/app/api/clientes/route.ts retornando a lista de clientes",
      "Teste no browser: acesse /api/produtos e /api/clientes e veja o JSON",
    ],
    bonus: [
      "Crie /api/clientes/[id]/route.ts com 404 para id inexistente",
      "Adicione filtro por query string: GET /api/produtos?categoria=canecas usando req.nextUrl.searchParams",
    ],
    xp: 40,
    nextHref: "/modulos/nextjs/otimizacoes",
    nextLabel: "Aula 04: Otimizações →",
  },
];
