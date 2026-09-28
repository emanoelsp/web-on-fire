"use client";

/**
 * Demos da Aula 05 — gráficos com recharts (engine sobre a qual o Tremor é
 * construído; funciona com React 19 + Tailwind v4). Dados mock em memória,
 * paleta fire/zinc do projeto.
 */

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Flame, Trophy } from "lucide-react";

const axis = { stroke: "#71717a", fontSize: 12 };
const tooltipStyle = {
  background: "#18181b",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#f4f4f5",
  fontSize: "0.8rem",
};

const acessos = [
  { semana: "Sem 1", acessos: 45 },
  { semana: "Sem 2", acessos: 72 },
  { semana: "Sem 3", acessos: 68 },
  { semana: "Sem 4", acessos: 94 },
  { semana: "Sem 5", acessos: 110 },
  { semana: "Sem 6", acessos: 128 },
];

const niveis = [
  { nome: "Faísca", qtd: 40 },
  { nome: "Chama", qtd: 25 },
  { nome: "Fogueira", qtd: 15 },
  { nome: "Incêndio", qtd: 8 },
];
const donutColors = ["#FFB800", "#FF8C00", "#FF5500", "#CC2200"];

// ─── KPIs (cards de métrica) ──────────────────────────────────────────────────
function KpiCardsDemo() {
  const kpis = [
    { label: "Alunos ativos", value: "128", delta: "+12%", up: true, Icon: Users },
    { label: "XP médio", value: "1.840", delta: "+8%", up: true, Icon: Flame },
    { label: "Taxa de conclusão", value: "63%", delta: "-3%", up: false, Icon: Trophy },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {kpis.map(({ label, value, delta, up, Icon }) => (
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
          <p className="mt-1 text-xs text-zinc-500">vs. semana anterior</p>
        </div>
      ))}
    </div>
  );
}

// ─── Barras ───────────────────────────────────────────────────────────────────
function BarChartDemo() {
  return (
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
  );
}

// ─── Área (evolução no tempo) ─────────────────────────────────────────────────
function AreaChartDemo() {
  return (
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
  );
}

// ─── Rosca (proporção) ────────────────────────────────────────────────────────
function DonutChartDemo() {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={niveis} dataKey="qtd" nameKey="nome" innerRadius={60} outerRadius={90} paddingAngle={3} stroke="none">
            {niveis.map((_, i) => (
              <Cell key={i} fill={donutColors[i % donutColors.length]} />
            ))}
          </Pie>
          <RTooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "0.8rem", color: "#a1a1aa" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export const CHART_DEMOS: Record<string, React.ComponentType> = {
  "chart-kpi": KpiCardsDemo,
  "chart-bar": BarChartDemo,
  "chart-area": AreaChartDemo,
  "chart-donut": DonutChartDemo,
};
