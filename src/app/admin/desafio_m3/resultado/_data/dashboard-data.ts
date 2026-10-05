export type Kpis = { alunos: number; xpMedio: number; conclusao: number };
export type AcessoSemana = { semana: string; acessos: number };
export type NivelCount = { nome: string; qtd: number };
export type DashboardData = { kpis: Kpis; acessos: AcessoSemana[]; niveis: NivelCount[] };

type AlunoCru = { nivel: string };

const ALUNOS_CRUS: AlunoCru[] = [
  ...Array.from({ length: 40 }, () => ({ nivel: "Faísca" })),
  ...Array.from({ length: 25 }, () => ({ nivel: "Chama" })),
  ...Array.from({ length: 15 }, () => ({ nivel: "Fogueira" })),
  ...Array.from({ length: 8 }, () => ({ nivel: "Incêndio" })),
];

/** Bônus b2 — agregação dos níveis com reduce a partir de uma lista crua. */
function agregarNiveis(alunos: AlunoCru[]): NivelCount[] {
  const contagem = alunos.reduce<Record<string, number>>((acc, a) => {
    acc[a.nivel] = (acc[a.nivel] ?? 0) + 1;
    return acc;
  }, {});
  return Object.entries(contagem).map(([nome, qtd]) => ({ nome, qtd }));
}

/**
 * Item s18 — busca/agregação separada do desenho. Num projeto novo (sem o
 * auth client-side desta área /admin), isso roda num Server Component; aqui
 * fica como função assíncrona chamada antes de montar os gráficos.
 */
export async function getDashboardData(): Promise<DashboardData> {
  return {
    kpis: { alunos: ALUNOS_CRUS.length, xpMedio: 1840, conclusao: 63 },
    acessos: [
      { semana: "Sem 1", acessos: 45 }, { semana: "Sem 2", acessos: 72 },
      { semana: "Sem 3", acessos: 68 }, { semana: "Sem 4", acessos: 94 },
      { semana: "Sem 5", acessos: 110 }, { semana: "Sem 6", acessos: 128 },
    ],
    niveis: agregarNiveis(ALUNOS_CRUS),
  };
}
