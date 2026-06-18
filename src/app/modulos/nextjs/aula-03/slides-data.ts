import type { Slide } from "@/types/slides";

export const AULA03_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Aula 03",
    title: "SERVER vs\nCLIENT\nCOMPONENTS",
    subtitle: "A decisão mais importante do App Router.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema",
    title: "Por que isso importa tanto?",
    items: [
      { icon: "📦", text: "Todo componente que vai ao client aumenta o bundle JS enviado ao browser." },
      { icon: "🐌", text: "Bundle maior = mais tempo de download, parse e execução — página mais lenta." },
      { icon: "🔐", text: "Lógica no client pode expor segredos e dados sensíveis (tokens, queries de banco)." },
      { icon: "✅", text: "RSC resolve tudo: componentes que ficam no servidor, sem JS no bundle do browser." },
    ],
  },
  {
    id: 3,
    type: "definition",
    tag: "Definição",
    title: "O que são React Server Components",
    quote: "RSC são componentes React que rodam exclusivamente no servidor — eles buscam dados, acessam banco de dados e usam segredos, sem nenhum JavaScript sendo enviado ao browser.",
    highlights: [
      "exclusivamente no servidor",
      "buscam dados, acessam banco de dados e usam segredos",
      "nenhum JavaScript sendo enviado ao browser",
    ],
  },
  {
    id: 4,
    type: "comparison",
    tag: "Server vs Client",
    title: "A diferença na prática",
    left: {
      label: "Server Component (padrão)",
      items: [
        "Roda no servidor (Node.js)",
        "Zero JS enviado ao browser",
        "Pode ser async/await",
        "Acessa BD, APIs, env vars",
        "Sem useState, useEffect, eventos",
      ],
    },
    right: {
      label: "Client Component ('use client')",
      items: [
        "Roda no browser",
        "JS enviado e executado",
        "Não pode ser async direto",
        "Acessa só APIs do browser",
        "useState, useEffect, onClick...",
      ],
    },
    tip: "Regra: todo componente é Server por padrão. Só adicione 'use client' quando precisar de interatividade.",
  },
  {
    id: 5,
    type: "code",
    tag: "Server Component",
    title: "Buscando dados no servidor",
    codeLabel: "src/app/produtos/page.tsx",
    tip: "Nenhuma linha desse código vai para o browser. O HTML chega pronto — zero JS, zero loading spinner.",
    code: `// Sem 'use client' = Server Component
// Este arquivo NUNCA vai para o bundle do browser

import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

async function getProdutos() {
  // Acesso direto ao Firestore — impossível em Client Component
  const snap = await getDocs(collection(db, "produtos"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default async function ProdutosPage() {
  const produtos = await getProdutos(); // await direto!

  return (
    <section>
      <h1>Produtos ({produtos.length})</h1>
      {produtos.map((p) => (
        <div key={p.id}>{p.nome}</div>
      ))}
    </section>
  );
}`,
  },
  {
    id: 6,
    type: "code",
    tag: "Client Component",
    title: "Interatividade no cliente",
    codeLabel: "src/components/AddToCart.tsx",
    tip: "Use Client Components para o que só o browser pode fazer: clicks, inputs, animações, localStorage, etc.",
    code: `"use client"; // ← marca como Client Component

import { useState } from "react";

interface Props {
  productId: string;
  price: number;
}

export default function AddToCart({ productId, price }: Props) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    // Lógica de carrinho no client
    const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    cart.push({ productId, qty, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
  }

  return (
    <div>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        min={1}
      />
      <button onClick={handleAdd}>
        {added ? "✓ Adicionado!" : "Adicionar ao Carrinho"}
      </button>
    </div>
  );
}`,
  },
  {
    id: 7,
    type: "architecture",
    tag: "A fronteira",
    title: "Como server e client se conectam",
    subtitle: "O fluxo de dados entre as duas camadas",
    steps: [
      { icon: "🖥️", text: "Server Component busca dados (Firestore, API, banco)" },
      { icon: "📦", text: "Passa dados serializáveis (strings, numbers, objetos) como props ao Client" },
      { icon: "🚫", text: "Não pode passar: funções, classes, Maps, Sets — eles não são serializáveis" },
      { icon: "🌐", text: "Client Component recebe as props e controla a interatividade" },
    ],
    tip: "Pense assim: Server = buscar e preparar dados. Client = exibir e reagir ao usuário.",
  },
  {
    id: 8,
    type: "code",
    tag: "Composição",
    title: "Server + Client na mesma página",
    codeLabel: "src/app/produtos/[id]/page.tsx",
    code: `// Server Component — busca os dados
import { AddToCart } from "@/components/AddToCart"; // Client Component

async function getProduto(id: string) {
  // Roda no servidor — pode acessar banco diretamente
  return db.collection("produtos").doc(id).get();
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const produto = await getProduto(id);

  return (
    <article>
      <h1>{produto.nome}</h1>         {/* renderizado no servidor */}
      <p>{produto.descricao}</p>       {/* renderizado no servidor */}

      {/* Client Component aninhado: recebe dados serializáveis */}
      <AddToCart
        productId={produto.id}
        price={produto.preco}
      />
    </article>
  );
}`,
    tip: "Você pode aninhar Client Components dentro de Server Components. O contrário (Server dentro de Client) exige a prop children.",
  },
  {
    id: 9,
    type: "best-practices",
    tag: "Padrões",
    title: "O que fazer e o que evitar",
    items: [
      { icon: "✅", text: "Use Server Components por padrão — troque para Client só quando necessário." },
      { icon: "✅", text: "Busque dados no Server Component e passe como props ao Client." },
      { icon: "✅", text: "Coloque 'use client' o mais fundo possível na árvore de componentes." },
      { icon: "❌", text: "Evite buscar dados com useEffect — prefira Server Components com fetch." },
      { icon: "❌", text: "Não marque pages inteiras como 'use client' sem necessidade." },
      { icon: "❌", text: "Não passe funções como props de Server para Client — não é serializável." },
    ],
  },
  {
    id: 10,
    type: "concept",
    tag: "Streaming",
    title: "Suspense e Streaming",
    items: [
      { icon: "⚡", text: "Streaming permite enviar HTML em partes — o header aparece antes dos dados carregarem." },
      { icon: "🔄", text: "Suspense define o que mostrar enquanto um componente carrega (fallback)." },
      { icon: "📄", text: "loading.tsx é o Suspense automático do App Router para a rota inteira." },
      { icon: "🎯", text: "Use <Suspense fallback={<Skeleton/>}> para controle granular dentro da página." },
    ],
    tip: "Com Streaming, a página aparece progressivamente — o usuário vê algo imediatamente, mesmo que parte dos dados ainda carregue.",
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 03",
    title: "SERVER vs CLIENT\nNA PRÁTICA",
    subtitle: "Identifique e implemente o padrão correto",
    tasks: [
      "Crie uma página Server Component que lista usuários de uma API pública",
      "Crie um componente SearchBar.tsx com 'use client' e useState",
      "Passe a lista de usuários do Server para o Client como prop",
      "Filtre a lista no client conforme o usuário digita",
      "Certifique-se que o fetch acontece no servidor, não no browser",
    ],
    bonus: [
      "Adicione um Suspense com fallback de loading enquanto os dados chegam",
      "Crie um componente <UserCard> Server para renderizar cada usuário",
    ],
    nextHref: "/modulos/nextjs/aula-04",
    nextLabel: "Aula 04: Layouts & UX →",
  },
];
