# Resolução — Desafio Final do Módulo 03 (Painel On Fire)

Gabarito de referência para `/modulos/ui/desafio` (`src/app/modulos/ui/desafio/page.tsx`).
Uso do professor. Código fiel ao padrão usado nos demos das aulas (zinc/orange,
`cn()`, Lucide, Sonner, SweetAlert2, canvas-confetti, Radix/Shadcn, recharts) —
é a mesma "Central On Fire" que evolui em `demos-projeto.tsx`, só que agora como
projeto próprio do aluno, fora da Academy.

Cada bloco de código abaixo responde a um item do checklist do desafio. A ordem
segue os 5 estágios da página de desafio.

---

## Quickstart (setup)

```bash
npx create-next-app@latest painel-on-fire --ts --tailwind --app
cd painel-on-fire
npm install clsx tailwind-merge lucide-react sonner sweetalert2 canvas-confetti recharts
npx shadcn@latest init
npx shadcn@latest add button input dialog dropdown-menu switch
```

`shadcn init` cria `components.json` + `lib/utils.ts` (com `cn()`) e, ao rodar
`add button`, instala `class-variance-authority` e `@radix-ui/react-slot` como
dependências automaticamente — não precisa instalar à mão.

---

## Estágio 1 · Fundação (Tailwind)

**s1 — Dark mode + paleta zinc/orange**

```ts
// tailwind.config.ts — Tailwind v4 usa dark mode via classe por padrão
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}
```

`className="dark"` na raiz liga as variantes `dark:` do projeto inteiro sem
precisar de toggle nenhum nesse estágio (o toggle fica pro bônus **b1**).

**s2 — Hero com gradiente, subtítulo e 2 botões**

```tsx
// app/page.tsx
export default function Home() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <span className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
        🔥 Painel On Fire
      </span>
      <h1 className="mt-4 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Central On Fire
      </h1>
      <p className="mt-4 text-zinc-400">
        Do primeiro botão ao painel completo — estilização, componentes e dados numa página só.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button className="rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95">
          Começar agora
        </button>
        <button className="rounded-lg border-2 border-orange-500/60 px-6 py-3 font-semibold text-orange-400 transition hover:bg-orange-500/10">
          Ver trilha
        </button>
      </div>
    </section>
  );
}
```

**s3 — Hover/active só com Tailwind:** já cobertos acima —
`hover:-translate-y-0.5 hover:brightness-110 active:scale-95` no primário,
`hover:bg-orange-500/10` no outline.

**s4 — Mobile-first:** `flex-col` → `sm:flex-row` nos botões; o grid de KPIs do
Estágio 5 usa `grid-cols-1 sm:grid-cols-3`. Regra geral do projeto: comece sem
prefixo (mobile) e adicione `sm:`/`md:`/`lg:` só onde o layout precisa mudar.

---

## Estágio 2 · Design System (Componentes + Ícones)

**s5 — `cn()` em `lib/utils.ts`** (gerado pelo `shadcn init`, mesmo arquivo do
projeto em `src/lib/utils.ts`):

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**s6 — Button, Card e Badge reutilizáveis** (padrão real do Shadcn, com
`class-variance-authority` — é o que `npx shadcn add button` gera):

```tsx
// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
        outline: "border border-orange-500/60 text-orange-400 hover:bg-orange-500/10",
        ghost: "text-zinc-300 hover:bg-white/5",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
```

```tsx
// components/ui/card.tsx
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-xl border border-white/10 bg-zinc-900 p-4", className)} {...props} />;
}
```

```tsx
// components/ui/badge.tsx
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400",
        className,
      )}
      {...props}
    />
  );
}
```

**s7 — Ícones Lucide integrados (com `aria-label` em icon-only):**

```tsx
import { LogIn, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

<Button><LogIn size={18} /> Entrar</Button>
<Button size="sm" variant="outline" aria-label="Configurações" className="px-2.5">
  <Settings size={16} />
</Button>
```

**s8 — CTA dispara `toast.success`:**

```tsx
"use client";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <>
      <Toaster theme="dark" richColors position="bottom-right" />
      <Button size="lg" onClick={() => toast.success("Bem-vindo à Central On Fire! 🔥")}>
        Começar agora
      </Button>
    </>
  );
}
```

`<Toaster />` só precisa existir **uma vez** — o ideal é no `app/layout.tsx`
(dentro do `<body>`), não repetido em cada componente.

---

## Estágio 3 · Acessível (Headless / Shadcn)

**s9 — Header com `DropdownMenu` + `Switch`:**

```tsx
// components/Header.tsx
"use client";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import { Flame, User, Settings, LogOut } from "lucide-react";

export function Header() {
  const [notif, setNotif] = useState(true);
  const item = "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 outline-none data-[highlighted]:bg-orange-500/15 data-[highlighted]:text-orange-300 cursor-pointer";

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div className="flex items-center gap-2 font-bold text-zinc-100">
        <Flame className="text-orange-500" size={22} /> Central On Fire
      </div>
      <div className="flex items-center gap-4">
        <Switch.Root
          checked={notif}
          onCheckedChange={setNotif}
          aria-label="Notificações"
          className="relative h-6 w-11 rounded-full bg-zinc-700 outline-none transition-colors data-[state=checked]:bg-orange-500"
        >
          <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button aria-label="Menu do usuário" className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
              <User size={18} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content sideOffset={8} align="end" className="z-[101] min-w-44 rounded-xl border border-white/10 bg-zinc-900 p-1.5 shadow-2xl">
              <DropdownMenu.Item className={item}><Settings size={16} /> Preferências</DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1.5 h-px bg-white/10" />
              <DropdownMenu.Item className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 outline-none data-[highlighted]:bg-red-500/15 cursor-pointer">
                <LogOut size={16} /> Sair
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
```

**s10 — Modal de login (`Dialog` + `Input` + `Button` do Shadcn):**

```tsx
// components/LoginDialog.tsx
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function LoginDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline"><LogIn size={18} /> Entrar</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl focus:outline-none">
          <Dialog.Title className="text-lg font-bold text-zinc-100">Entrar</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-zinc-400">Acesse sua Central On Fire.</Dialog.Description>
          <form className="mt-4 flex flex-col gap-3">
            <input className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="seu@email.com" />
            <input type="password" className="rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-orange-500/60" placeholder="senha" />
            <Dialog.Close asChild>
              <Button onClick={() => toast.success("Login demo — bem-vindo! 🔥")}>Entrar</Button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**s11 — Modal de confirmação (foco preso, `Esc`, navegação por `Tab`):**
Vem de fábrica do Radix `Dialog` — não é código extra, é comportamento
automático do componente (`Dialog.Content` já trava o foco dentro de si e
fecha com `Esc`/clique fora). Peça para o aluno **testar** isso, não
implementar:

```tsx
<Dialog.Root>
  <Dialog.Trigger asChild>
    <Button variant="outline" className="border-red-500/60 text-red-400 hover:bg-red-500/10">
      Excluir conta
    </Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
    <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl focus:outline-none">
      <Dialog.Title className="text-lg font-bold text-zinc-100">Tem certeza absoluta?</Dialog.Title>
      <Dialog.Description className="mt-2 text-sm text-zinc-400">
        Esta ação não pode ser desfeita.
      </Dialog.Description>
      <div className="mt-6 flex justify-end gap-3">
        <Dialog.Close asChild><Button variant="ghost">Cancelar</Button></Dialog.Close>
        <Dialog.Close asChild><Button className="bg-red-600 hover:bg-red-700 shadow-red-600/20">Sim, excluir</Button></Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

Critério de aceite: abrir o modal, apertar `Tab` repetidamente (o foco nunca
sai do modal) e apertar `Esc` (fecha). Se o aluno escreveu o próprio modal com
`position: fixed` e `useState`, sem Radix/Shadcn, isso **não** atende ao item —
o ponto da aula era delegar acessibilidade pro headless.

---

## Estágio 4 · Micro-interações (Feedback)

**s12 — `toast.promise` numa operação async:**

```tsx
"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function salvarAluno() {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => (Math.random() > 0.2 ? resolve() : reject()), 1600);
  });
}

export function SalvarButton() {
  return (
    <Button
      onClick={() =>
        toast.promise(salvarAluno(), {
          loading: "Salvando aluno…",
          success: "Salvo com sucesso!",
          error: "Não foi possível salvar.",
        })
      }
    >
      Salvar
    </Button>
  );
}
```

**s13 — SweetAlert2 bloqueante antes de ação destrutiva:**

```tsx
"use client";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExcluirAlunoButton() {
  const confirmar = async () => {
    const result = await Swal.fire({
      title: "Excluir aluno?",
      text: "Essa ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3f3f46",
      background: "#18181b",
      color: "#f4f4f5",
    });
    if (result.isConfirmed) toast.success("Aluno excluído.");
  };
  return (
    <Button variant="outline" className="border-red-500/60 text-red-400 hover:bg-red-500/10" onClick={confirmar}>
      <Trash2 size={18} /> Excluir aluno
    </Button>
  );
}
```

**s14 — `canvas-confetti` ao concluir missão/cadastro:**

```tsx
"use client";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const fireColors = ["#FF5500", "#FF8C00", "#FFB800", "#f97316"];

export function ConcluirMissaoButton() {
  const concluir = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 }, colors: fireColors });
    toast.success("🏆 Missão concluída! +50 XP"); // cobre também o bônus b4
  };
  return <Button variant="secondary" onClick={concluir}><Trophy size={18} /> Concluir missão</Button>;
}
```

---

## Estágio 5 · Painel de Dados (recharts)

**s18 primeiro, porque organiza os outros três:** o Server Component busca/
agrega os dados e só passa props prontas para um Client Component desenhar.

```tsx
// app/dashboard/page.tsx (Server Component — sem "use client")
import { DashboardCharts } from "@/components/DashboardCharts";

async function getDashboardData() {
  // Em produção: Firestore/API. Aqui, mock representando o formato final.
  return {
    kpis: { alunos: 128, xpMedio: 1840, conclusao: 63 },
    acessos: [
      { semana: "Sem 1", acessos: 45 }, { semana: "Sem 2", acessos: 72 },
      { semana: "Sem 3", acessos: 68 }, { semana: "Sem 4", acessos: 94 },
    ],
    niveis: [
      { nome: "Faísca", qtd: 40 }, { nome: "Chama", qtd: 25 },
      { nome: "Fogueira", qtd: 15 }, { nome: "Incêndio", qtd: 8 },
    ],
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardCharts {...data} />;
}
```

**s15 — KPIs com tendência:**

```tsx
// components/DashboardCharts.tsx
"use client";
import { TrendingUp, TrendingDown, Users, Flame, Trophy } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";

type Props = {
  kpis: { alunos: number; xpMedio: number; conclusao: number };
  acessos: { semana: string; acessos: number }[];
  niveis: { nome: string; qtd: number }[];
};

const axis = { stroke: "#71717a", fontSize: 12 };
const tooltipStyle = { background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f4f4f5", fontSize: "0.8rem" };
const donutColors = ["#FFB800", "#FF8C00", "#FF5500", "#CC2200"];

export function DashboardCharts({ kpis, acessos, niveis }: Props) {
  const cards = [
    { label: "Alunos ativos", value: kpis.alunos, delta: "+12%", up: true, Icon: Users },
    { label: "XP médio", value: kpis.xpMedio, delta: "+8%", up: true, Icon: Flame },
    { label: "Taxa de conclusão", value: `${kpis.conclusao}%`, delta: "-3%", up: false, Icon: Trophy },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, delta, up, Icon }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-zinc-900 p-4">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-xs">{label}</span>
              <Icon size={16} className="text-orange-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-zinc-50">{value}</span>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-400" : "text-red-400"}`}>
                {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* s16 — BarChart */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={acessos} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="semana" {...axis} tickLine={false} axisLine={false} />
            <YAxis {...axis} tickLine={false} axisLine={false} />
            <RTooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,85,0,0.08)" }} />
            <Bar dataKey="acessos" fill="#FF5500" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* s16 — AreaChart (com degradê do bônus b5) */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={acessos} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="fireArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5500" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#FF5500" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="semana" {...axis} tickLine={false} axisLine={false} />
            <YAxis {...axis} tickLine={false} axisLine={false} />
            <RTooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="acessos" stroke="#FF8C00" strokeWidth={2} fill="url(#fireArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* s17 — DonutChart */}
      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={niveis} dataKey="qtd" nameKey="nome" innerRadius={60} outerRadius={90} paddingAngle={3} stroke="none">
              {niveis.map((_, i) => <Cell key={i} fill={donutColors[i % donutColors.length]} />)}
            </Pie>
            <RTooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a1a1aa" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
```

Nota: `recharts` é a engine sobre a qual o Tremor é construído (mesmo motivo
pelo qual as aulas usam `recharts` direto — Tremor v3 exige React 18 +
Tailwind v3, incompatível com este projeto em React 19 + Tailwind v4).

---

## Bônus (referência rápida)

- **b1** — tema no `localStorage`: `useEffect` lê `localStorage.getItem("theme")`
  no mount e aplica/remove a classe `dark` no `<html>`; `onClick` do toggle
  grava de volta com `localStorage.setItem`.
- **b2** — agregação com `reduce`: `alunos.reduce((acc, a) => { acc[a.nivel] = (acc[a.nivel] ?? 0) + 1; return acc; }, {} as Record<string, number>)` para montar o array do donut a partir de uma lista crua.
- **b3** — login/cadastro com **React Hook Form + Zod**:
  ```tsx
  const schema = z.object({ email: z.string().email(), senha: z.string().min(6) });
  const form = useForm({ resolver: zodResolver(schema) });
  ```
- **b4** — já coberto no trecho do item **s14** (confete + `toast.success` no mesmo clique).
- **b5** — já coberto no `<linearGradient id="fireArea">` do item **s16**.

---

## Checklist de aceite (critérios da página de desafio)

| Critério | Como verificar |
|---|---|
| Responsivo mobile/tablet/desktop | Redimensionar a janela / DevTools (375px, 768px, 1280px) |
| Dark mode em toda a interface | `className="dark"` na raiz + nenhum fundo/texto hardcoded fora da paleta zinc |
| Componentes reutilizados via `cn()` | Nenhuma classe repetida copy-paste entre botões — tudo passa por `buttonVariants`/`cn()` |
| Modal acessível (teclado, foco preso, Esc) | Abrir o Dialog, apertar `Tab` em loop e `Esc` |
| Feedback proporcional à gravidade | Toast = informativo; SweetAlert = bloqueante/destrutivo; confete = celebração |
| Gráficos corretos e responsivos | Redimensionar a janela com o `ResponsiveContainer` montado |
| TypeScript sem erros | `npx tsc --noEmit` |

---

## Observação pedagógica

Este desafio **não** pede um app novo do zero — ele pede para o aluno levar a
mesma "Central On Fire" vista evoluindo nos slides (estágios 1→5 em
`src/components/slides/demos-projeto.tsx`) para um projeto próprio, fora da
Academy. Se o aluno ficar travado em algum estágio, mande-o comparar com o
demo `projeto-N` correspondente antes de dar o código deste gabarito.
