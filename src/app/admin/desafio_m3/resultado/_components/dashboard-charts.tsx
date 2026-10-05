"use client";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip,
  AreaChart, Area, PieChart, Pie, Cell, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, Flame, Trophy } from "lucide-react";
import type { DashboardData } from "../_data/dashboard-data";

const axis = { stroke: "#71717a", fontSize: 12 };
const tooltipStyle = { background: "#18181b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f4f4f5", fontSize: "0.8rem" };
const donutColors = ["#FFB800", "#FF8C00", "#FF5500", "#CC2200"];

/** Validação dos itens s15–s17 (e bônus b5: degradê no AreaChart). */
export function DashboardCharts({ kpis, acessos, niveis }: DashboardData) {
  const cards = [
    { label: "Alunos ativos", value: kpis.alunos, delta: "+12%", up: true, Icon: Users },
    { label: "XP médio", value: kpis.xpMedio, delta: "+8%", up: true, Icon: Flame },
    { label: "Taxa de conclusão", value: `${kpis.conclusao}%`, delta: "-3%", up: false, Icon: Trophy },
  ];

  return (
    <div className="flex flex-col gap-6">
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
