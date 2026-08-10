import type { Slide } from "@/types/slides";

export const AULA_COMPONENTES_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 02 · Aula 01 · Parte 2",
    title: "COMPONENTES\nREUTILIZÁVEIS",
    subtitle: "Você já sabe criar rotas. Agora vamos montar os blocos que aparecem em todas elas.",
  },
  {
    id: 2,
    type: "code",
    tag: "O problema",
    title: "O que acontece sem componentes",
    codeLabel: "Sem componentes — o pesadelo da duplicação",
    tip: "Esse código existe nas suas 10 páginas. Muda o logo em um lugar → tem que mudar em 10. Isso é o bug esperando para acontecer.",
    code: `// app/page.tsx
export default function Home() {
  return (
    <>
      <header style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
        <span>🔥 MeuSite</span>
        <nav><a href="/">Início</a> <a href="/sobre">Sobre</a></nav>
      </header>
      <main>Conteúdo da home...</main>
    </>
  );
}

// app/sobre/page.tsx  ← MESMO header copiado
export default function Sobre() {
  return (
    <>
      <header style={{ padding: "1rem", borderBottom: "1px solid #eee" }}>
        <span>🔥 MeuSite</span>  {/* ← duplicado */}
        <nav><a href="/">Início</a> <a href="/sobre">Sobre</a></nav>
      </header>
      <main>Conteúdo da página sobre...</main>
    </>
  );
}

// app/contato/page.tsx  ← MESMO header copiado de novo
// ... e assim por diante em cada página`,
  },
  {
    id: 3,
    type: "concept",
    tag: "A solução",
    title: "Componente reutilizável: crie uma vez, use em qualquer lugar",
    items: [
      { icon: "🧱", text: "Um componente é um bloco de UI com nome — você importa <Header /> em vez de recopiar o HTML." },
      { icon: "🔁", text: "Muda o logo no Header.tsx → muda em todas as páginas de uma vez, automaticamente." },
      { icon: "🎛️", text: "Props tornam o componente flexível — mesmo componente, comportamentos diferentes por página." },
      { icon: "📐", text: "Regra: se você usou o mesmo JSX mais de uma vez, já é hora de extrair um componente." },
    ],
    tip: "Componentes reutilizáveis reduzem bugs: corrigir em um lugar corrige em todos.",
  },
  {
    id: 4,
    type: "files",
    tag: "Arquitetura",
    title: "Onde ficam os componentes?",
    codeLabel: "src/ — estrutura recomendada",
    code: `📁 src/
  📁 app/
    📄 layout.tsx        ← importa Header e Footer (uma vez só)
    📄 page.tsx
    📁 sobre/
      📄 page.tsx        ← não precisa importar Header aqui
    📁 contato/
      📄 page.tsx        ← nem aqui
  📁 components/         ← componentes reutilizáveis ficam aqui
    📄 Header.tsx        ← cabeçalho do site
    📄 Footer.tsx        ← rodapé do site
    📄 Navbar.tsx        ← menu de navegação
    📁 ui/               ← botões, cards, badges...
      📄 Button.tsx
      📄 Card.tsx
  📁 lib/                ← utilitários, configurações`,
    tip: "Pasta components/ na raiz de src/ é a convenção mais comum — todos os devs vão encontrar sem pensar.",
  },
  {
    id: 5,
    type: "code",
    tag: "Header",
    title: "Criando o Header",
    codeLabel: "src/components/Header.tsx",
    tip: "Sem 'use client' — Header é Server Component por padrão. Só adicione se precisar de estado ou eventos.",
    code: `import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eee",
      }}
    >
      {/* Logo / nome do site */}
      <Link href="/" style={{ fontWeight: 700, fontSize: "1.25rem", textDecoration: "none" }}>
        🔥 MeuSite
      </Link>

      {/* Navegação principal */}
      <nav style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/">Início</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/contato">Contato</Link>
      </nav>
    </header>
  );
}`,
  },
  {
    id: 6,
    type: "code",
    tag: "Footer",
    title: "Criando o Footer com props",
    codeLabel: "src/components/Footer.tsx",
    tip: "Props com valor padrão (companyName = 'MeuSite') — o componente funciona mesmo sem receber a prop.",
    code: `import Link from "next/link";

interface FooterProps {
  companyName?: string; // opcional — tem valor padrão
}

export default function Footer({ companyName = "MeuSite" }: FooterProps) {
  const year = new Date().getFullYear(); // ano sempre atualizado

  return (
    <footer
      style={{
        padding: "2rem",
        textAlign: "center",
        borderTop: "1px solid #eee",
        color: "#666",
        fontSize: "0.875rem",
      }}
    >
      <p>© {year} {companyName}. Todos os direitos reservados.</p>
      <nav style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link href="/privacidade">Privacidade</Link>
        <Link href="/termos">Termos</Link>
      </nav>
    </footer>
  );
}

// Uso sem prop:  <Footer />  → "© 2025 MeuSite."
// Uso com prop: <Footer companyName="On Fire Academy" />`,
  },
  {
    id: 7,
    type: "code",
    tag: "Navbar ativa",
    title: "Navbar com link destacado",
    codeLabel: "src/components/Navbar.tsx",
    tip: "usePathname() retorna a rota atual ('/sobre', '/blog'...) — compara com href para saber qual link destacar.",
    code: `"use client"; // usePathname precisa do browser
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/",        label: "Início" },
  { href: "/sobre",   label: "Sobre" },
  { href: "/blog",    label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname(); // "/sobre", "/blog"...

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          style={{
            fontWeight: pathname === href ? 700 : 400,
            color: pathname === href ? "#FF5500" : "inherit",
            textDecoration: "none",
            borderBottom: pathname === href ? "2px solid #FF5500" : "2px solid transparent",
            paddingBottom: "2px",
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}`,
  },
  {
    id: 8,
    type: "code",
    tag: "layout.tsx",
    title: "Conectando tudo no layout global",
    codeLabel: "src/app/layout.tsx",
    tip: "Header e Footer importados uma vez aqui → aparecem em /sobre, /blog, /contato e em toda rota futura automaticamente.",
    code: `import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "MeuSite",
  description: "Descrição do meu site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />                                    {/* ← uma vez */}

        <main style={{ minHeight: "calc(100vh - 160px)" }}>
          {children}  {/* /sobre, /blog, /contato... entram aqui */}
        </main>

        <Footer companyName="MeuSite" />             {/* ← uma vez */}
      </body>
    </html>
  );
}`,
  },
  {
    id: 9,
    type: "architecture",
    tag: "O quadro completo",
    title: "Como tudo se encaixa",
    subtitle: "Browser → layout.tsx → página específica",
    steps: [
      { icon: "🌐", text: "Usuário acessa /sobre (ou /blog, /contato — qualquer rota)" },
      { icon: "🏗️", text: "Next.js renderiza layout.tsx: <Header /> + {children} + <Footer />" },
      { icon: "📄", text: "{children} recebe o conteúdo de app/sobre/page.tsx" },
      { icon: "✅", text: "Resultado: Header e Footer em todas as páginas — sem repetir uma linha de código" },
      { icon: "🔧", text: "Quer mudar o Header? Edita só Header.tsx → muda em todo o site de uma vez" },
    ],
    tip: "Esse é o poder do layout.tsx combinado com componentes: estrutura global, manutenção localizada.",
  },
  {
    id: 10,
    type: "best-practices",
    tag: "Boas práticas",
    title: "Regras de ouro de componentes",
    items: [
      { icon: "✅", text: "Um componente = uma responsabilidade. Header faz cabeçalho, não busca dados de usuário." },
      { icon: "✅", text: "Nomes com letra maiúscula: Header, Footer, Navbar — convenção obrigatória do React." },
      { icon: "✅", text: "Arquivo separado por componente — cada componente em seu próprio arquivo." },
      { icon: "✅", text: "Server Component por padrão — só adicione 'use client' se precisar de hooks ou eventos." },
      { icon: "❌", text: "Evite componentes com 300+ linhas. Se cresceu, extraia partes menores." },
      { icon: "❌", text: "Não misture lógica de negócio com UI — componente busca dado OU exibe dado, não os dois." },
    ],
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 05 · P2",
    title: "COMPONENTES\nREUTILIZÁVEIS",
    subtitle: "Construa os blocos estruturais do seu site",
    tasks: [
      "Crie src/components/Header.tsx com logo e 3 links de navegação usando <Link>",
      "Crie src/components/Footer.tsx com copyright e ano dinâmico (new Date().getFullYear())",
      "Importe Header e Footer no layout.tsx — confirme que /sobre e / mostram o mesmo cabeçalho sem repetir código",
    ],
    bonus: [
      "Crie src/components/Navbar.tsx com 'use client' e usePathname() para destacar o link da rota atual",
      "Extraia o array de links para uma constante e reutilize em Header e Navbar",
    ],
    nextHref: "/modulos/nextjs/aula-paginas",
    nextLabel: "Aula 01 · P3: Páginas e URLs →",
  },
];
