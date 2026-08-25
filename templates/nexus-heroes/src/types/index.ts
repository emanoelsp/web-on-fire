export type Classe = "guerreiro" | "mago" | "arqueiro" | "ladino" | "paladino";

export interface Personagem {
  id: string;
  nome: string;
  classe: Classe;
  nivel: number;
  userId: string;
  criadoEm: string;
  arma?: string;
  armadura?: string;
  anel?: string;
  xp: number;
}

export const CLASSES = {
  guerreiro: {
    nome: "Guerreiro",
    emoji: "⚔️",
    cor: "#ef4444",
    corFundo: "rgba(239,68,68,0.1)",
    corBorda: "rgba(239,68,68,0.3)",
    desc: "Mestre do combate corpo a corpo. Resistente e devastador na linha de frente.",
    atk: 9, def: 8, mgc: 2, spd: 5,
  },
  mago: {
    nome: "Mago",
    emoji: "🔮",
    cor: "#8b5cf6",
    corFundo: "rgba(139,92,246,0.1)",
    corBorda: "rgba(139,92,246,0.3)",
    desc: "Manipula os elementos com maestria arcana. Fraco fisicamente, devastador à distância.",
    atk: 3, def: 3, mgc: 10, spd: 6,
  },
  arqueiro: {
    nome: "Arqueiro",
    emoji: "🏹",
    cor: "#10b981",
    corFundo: "rgba(16,185,129,0.1)",
    corBorda: "rgba(16,185,129,0.3)",
    desc: "Precisão cirúrgica a longas distâncias. Rápido e mortal antes que o inimigo se aproxime.",
    atk: 8, def: 4, mgc: 3, spd: 9,
  },
  ladino: {
    nome: "Ladino",
    emoji: "🗡️",
    cor: "#f59e0b",
    corFundo: "rgba(245,158,11,0.1)",
    corBorda: "rgba(245,158,11,0.3)",
    desc: "Golpes furtivos e críticos letais. Especialista em eliminar alvos antes de serem detectados.",
    atk: 9, def: 3, mgc: 4, spd: 10,
  },
  paladino: {
    nome: "Paladino",
    emoji: "🛡️",
    cor: "#3b82f6",
    corFundo: "rgba(59,130,246,0.1)",
    corBorda: "rgba(59,130,246,0.3)",
    desc: "Protetor sagrado com poder divino. Equilibra combate e cura para sustentar aliados.",
    atk: 7, def: 10, mgc: 7, spd: 4,
  },
} as const;

export const ARMAS = [
  { id: "espada-longa", nome: "Espada Longa", emoji: "⚔️", clases: ["guerreiro", "paladino"] },
  { id: "cajado-arcano", nome: "Cajado Arcano", emoji: "🪄", clases: ["mago"] },
  { id: "arco-élfico", nome: "Arco Élfico", emoji: "🏹", clases: ["arqueiro"] },
  { id: "adagas-gêmeas", nome: "Adagas Gêmeas", emoji: "🗡️", clases: ["ladino"] },
  { id: "lança-sagrada", nome: "Lança Sagrada", emoji: "🔱", clases: ["paladino", "guerreiro"] },
  { id: "tomo-maldito", nome: "Tomo Maldito", emoji: "📖", clases: ["mago", "ladino"] },
];

export const ARMADURAS = [
  { id: "armadura-placas", nome: "Armadura de Placas", emoji: "🛡️", clases: ["guerreiro", "paladino"] },
  { id: "veste-arcana", nome: "Veste Arcana", emoji: "🥋", clases: ["mago", "ladino"] },
  { id: "couro-reforçado", nome: "Couro Reforçado", emoji: "🧥", clases: ["arqueiro", "ladino"] },
  { id: "manto-sagrado", nome: "Manto Sagrado", emoji: "👘", clases: ["paladino", "mago"] },
  { id: "malha-de-elos", nome: "Malha de Elos", emoji: "⛓️", clases: ["guerreiro", "arqueiro"] },
];

export const ANEIS = [
  { id: "anel-poder", nome: "Anel do Poder", emoji: "💍" },
  { id: "anel-proteção", nome: "Anel de Proteção", emoji: "🔮" },
  { id: "anel-velocidade", nome: "Anel da Velocidade", emoji: "⚡" },
  { id: "anel-cura", nome: "Anel da Cura", emoji: "💚" },
];
