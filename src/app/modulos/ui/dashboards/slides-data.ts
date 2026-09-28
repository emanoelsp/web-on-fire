import type { Slide } from "@/types/slides";

export const DASHBOARDS_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 05",
    title: "DADOS EM\nDASHBOARDS",
    subtitle: "Transforme números em gráficos bonitos e interativos — sem virar especialista em D3.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O desafio",
    title: "Por que gráficos são difíceis",
    items: [
      { icon: "📊", text: "Um dashboard cru é uma tabela de números. Ninguém 'enxerga' uma tendência olhando 200 linhas." },
      { icon: "😵", text: "Fazer gráficos do zero (SVG, escalas, eixos, tooltips) é trabalhoso e cheio de matemática — D3 tem curva íngreme." },
      { icon: "🎨", text: "recharts resolve: gráficos como componentes React. Você passa dados por props e recebe um gráfico responsivo e interativo." },
      { icon: "🧩", text: "Você foca no dado, não no desenho. Aprendeu um gráfico (dados + eixos), aprendeu todos." },
    ],
  },
  {
    id: 3,
    type: "definition",
    tag: "recharts x Tremor",
    title: "Qual biblioteca usar?",
    quote: "O Tremor é famoso por dashboards, mas hoje ele exige React 18 + Tailwind v3. Como este projeto é React 19 + Tailwind v4, usamos o recharts — que é exatamente a engine sobre a qual o Tremor é construído.",
    highlights: ["recharts = a base", "React 19 ✓", "Tailwind v4 ✓"],
    tip: "Lição real de mercado: sempre confira a compatibilidade (peer deps + versão do Tailwind) antes de adotar uma lib. Aprender a base (recharts) te deixa livre de qualquer wrapper.",
  },
  {
    id: 4,
    type: "concept",
    tag: "Anatomia do dashboard",
    title: "As peças de um bom painel",
    items: [
      { icon: "🔢", text: "Cards de métrica (KPIs): os números que importam em destaque — total de alunos, XP médio, taxa de conclusão." },
      { icon: "📈", text: "Gráfico de linha/área: evolução no tempo — acessos por semana, cadastros por mês." },
      { icon: "📊", text: "Gráfico de barras: comparação entre categorias — alunos por módulo, XP por aluno." },
      { icon: "🍩", text: "Gráfico de rosca/pizza: proporção de um todo — distribuição de níveis, status das aulas." },
    ],
  },
  {
    id: 5,
    type: "demo",
    tag: "KPIs",
    title: "Cards de métrica ao vivo",
    subtitle: "Comece o dashboard pelos KPIs: o número gigante + a variação (verde/vermelho) que o gestor olha primeiro.",
    demo: "chart-kpi",
    code: `// KPI = número em destaque + tendência. É só Tailwind:
<div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
  <span className="text-xs text-zinc-400">Alunos ativos</span>
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold text-zinc-50">128</span>
    <span className="text-xs text-emerald-400 flex items-center gap-0.5">
      <TrendingUp size={13} /> +12%
    </span>
  </div>
</div>`,
    codeLabel: "KpiCards.tsx",
    tip: "KPI = Key Performance Indicator. Nem todo 'gráfico' precisa de biblioteca: um KPI é só um número bem tipografado num card.",
  },
  {
    id: 6,
    type: "demo",
    tag: "recharts · Barras",
    title: "Barras: comparar categorias",
    subtitle: "Passe o mouse nas barras — o tooltip é de fábrica. index no eixo X, valores no eixo Y.",
    demo: "chart-bar",
    code: `// npm install recharts
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const dados = [
  { semana: "Sem 1", acessos: 45 },
  { semana: "Sem 2", acessos: 72 },
];

<ResponsiveContainer width="100%" height={260}>
  <BarChart data={dados}>
    <XAxis dataKey="semana" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="acessos" fill="#FF5500" radius={[6,6,0,0]} />
  </BarChart>
</ResponsiveContainer>`,
    codeLabel: "GraficoAcessos.tsx",
    tip: "dataKey é a chave que aponta para o campo dos seus dados. ResponsiveContainer com height fixo é obrigatório — sem ele o gráfico não aparece.",
  },
  {
    id: 7,
    type: "demo",
    tag: "recharts · Área",
    title: "Área/linha: evolução no tempo",
    subtitle: "O olho segue a curva subindo. Perfeito para tendências (acessos por semana, cadastros por mês).",
    demo: "chart-area",
    code: `import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

<AreaChart data={dados}>
  <defs>
    <linearGradient id="fire" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FF5500" stopOpacity={0.5} />
      <stop offset="100%" stopColor="#FF5500" stopOpacity={0} />
    </linearGradient>
  </defs>
  <XAxis dataKey="semana" /><YAxis /><Tooltip />
  <Area type="monotone" dataKey="acessos" stroke="#FF8C00" fill="url(#fire)" />
</AreaChart>`,
    codeLabel: "GraficoEvolucao.tsx",
    tip: "O <linearGradient> no <defs> é o mesmo conceito de gradiente da Aula 01 — aqui em SVG, para dar aquele degradê 'fire' sob a linha.",
  },
  {
    id: 8,
    type: "demo",
    tag: "recharts · Rosca",
    title: "Rosca: proporção de um todo",
    subtitle: "Distribuição de alunos por nível. innerRadius transforma a pizza em rosca; cada fatia ganha uma cor da paleta.",
    demo: "chart-donut",
    code: `import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const niveis = [{ nome: "Faísca", qtd: 40 }, { nome: "Chama", qtd: 25 }];
const cores = ["#FFB800", "#FF8C00", "#FF5500", "#CC2200"];

<PieChart>
  <Pie data={niveis} dataKey="qtd" nameKey="nome"
       innerRadius={60} outerRadius={90} paddingAngle={3}>
    {niveis.map((_, i) => <Cell key={i} fill={cores[i]} />)}
  </Pie>
  <Tooltip /><Legend />
</PieChart>`,
    codeLabel: "GraficoNiveis.tsx",
    tip: "innerRadius = 0 vira pizza; innerRadius > 0 vira rosca. O <Cell> pinta cada fatia individualmente — mapeie sua paleta com um .map().",
  },
  {
    id: 9,
    type: "quiz",
    tag: "Quiz",
    title: "O gráfico certo para o dado",
    question: "Você quer mostrar como os acessos evoluíram ao longo de 8 semanas. Qual gráfico é o mais indicado?",
    options: [
      { text: "Gráfico de rosca (donut)", correct: false, explanation: "Rosca mostra proporção de um todo num momento — não evolução no tempo." },
      { text: "Gráfico de linha ou área", correct: true, explanation: "Isso! Linha/área mostra tendência ao longo do tempo — o olho segue a curva subindo ou descendo." },
      { text: "Um card de métrica único", correct: false, explanation: "O KPI mostra UM número atual, não a evolução das 8 semanas." },
      { text: "Uma tabela com os 8 valores", correct: false, explanation: "Funciona, mas ninguém 'vê' a tendência numa tabela. O gráfico de linha comunica na hora." },
    ],
    xp: 15,
  },
  {
    id: 10,
    type: "code",
    tag: "Integração",
    title: "Server busca, Client desenha",
    codeLabel: "dashboard/page.tsx",
    code: `// Server Component — busca e agrega (Módulo 02!)
import { getAllProgress } from "@/services/progressService";
import { GraficoNiveis } from "./GraficoNiveis"; // Client ("use client")

export default async function DashboardPage() {
  const alunos = await getAllProgress();

  // agrega: quantos alunos em cada nível (JS puro)
  const porNivel = alunos.reduce<Record<string, number>>((acc, a) => {
    acc[a.levelName] = (acc[a.levelName] ?? 0) + 1;
    return acc;
  }, {});
  const dados = Object.entries(porNivel).map(([nome, qtd]) => ({ nome, qtd }));

  return <GraficoNiveis dados={dados} />; // passa pronto para o Client
}`,
    tip: "Gráficos do recharts são Client Components (interativos). O Server busca/agrega e entrega os dados prontos via props — o mesmo desenho do backoffice deste curso.",
  },
  {
    id: 11,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o gráfico",
    instruction: "No <Bar> do recharts, qual prop aponta para o campo dos dados que vira a altura da barra? (digite só o nome da prop)",
    prefix: `<Bar _______="acessos" fill="#FF5500" />`,
    answer: "dataKey",
    hint: "É a mesma prop que XAxis e Area usam para 'apontar' para um campo dos dados.",
    xp: 20,
  },
  {
    id: 12,
    type: "demo",
    tag: "🔥 Projeto do módulo",
    title: "O projeto até aqui: virou painel",
    subtitle: "Última camada: a Central On Fire ganha KPIs e um gráfico de acessos. De uma landing simples (Aula 01) a um painel completo — a mesma página, cinco aulas.",
    demo: "projeto-5",
    tip: "É exatamente esse caminho que o Desafio Final pede: pegar tudo (Tailwind, componentes, Radix, feedback, gráficos) e montar o Painel On Fire. Você já tem as peças.",
  },
  {
    id: 13,
    type: "mini-challenge",
    tag: "🎯 Missão 13",
    title: "PAINEL DE\nCONTROLE",
    subtitle: "Construa um dashboard que conta uma história",
    tasks: [
      "Instale recharts",
      "Crie mock data: um array de acessos por semana e um de alunos por nível",
      "Monte 3 cards de KPI (só Tailwind): total de alunos, XP médio e taxa de conclusão com TrendingUp/Down",
      "Adicione um BarChart de acessos por semana (dentro de um ResponsiveContainer com height)",
      "Adicione um AreaChart de evolução e um PieChart (rosca) de distribuição por nível",
      "Organize tudo num grid responsivo (1 coluna no mobile, 3 no desktop) — mobile first da Aula 01",
    ],
    bonus: [
      "Busque os dados num Server Component e agregue com reduce; passe prontos para o Client desenhar",
      "Use um <linearGradient> no <defs> para dar o degradê 'fire' sob a área",
    ],
    xp: 50,
    nextHref: "/modulos/ui/desafio",
    nextLabel: "🏆 Desafio Final do Módulo →",
  },
];
