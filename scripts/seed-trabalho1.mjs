/**
 * Seed de submissões falsas do TradeDesk Lab
 * Uso: node scripts/seed-trabalho1.mjs
 * (Requer npm run dev rodando em paralelo)
 */

const BASE = "http://localhost:3000";

const ALUNOS = [
  {
    displayName: "Ana Lima",
    githubUrl: "https://github.com/analima/tradedesk-lab",
    respostas: {
      b1: "O Header está duplicado: layout.tsx já renderiza <Header /> e page.tsx (home) importa e renderiza de novo. Só deve ficar no layout.",
      b2: "BoletaForm tem 'use client' e faz um useEffect que faz fetch de /api/acoes/[ticker] para buscar o preço, mas o componente pai (Server Component) já recebe acao como prop com todos os dados.",
      b3: "onPrecoAtualizado é uma função passada de um Server Component para GraficoAcao (Client Component). Funções não são serializáveis pelo Next.js — só primitivos, objetos simples e arrays podem cruzar esse limite.",
      b4: "Falta o await antes de params. No Next.js 15, params é uma Promise. A linha correta é: const { ticker } = await params.",
      b5: "O layout.tsx dentro de (protegido) importa e renderiza <Header /> manualmente. Como o RootLayout já inclui o Header, a rota /carteira exibe dois headers empilhados.",
      b6: 'O href está com valor literal "/acoes/ticker" em vez de dinâmico. O correto seria href={`/acoes/${acao.symbol}`} para cada linha da tabela.',
      b7: "A página acoes/page.tsx tem 'use client' e usa useEffect + useState para buscar os dados no browser. Ela deveria ser um Server Component async que faz o fetch diretamente.",
      b8: "A constante COMISSAO_SECRETA = 0.003 está definida em GraficoAcao.tsx (Client Component) e é logada com console.log — visível para qualquer um no DevTools.",
      b9: "Quando o ticker não existe, a rota retorna NextResponse.json({}) com status 200 padrão. O correto é retornar status 404 com uma mensagem de erro.",
      b10: "O endpoint aceita qualquer quantidade, inclusive 0 e negativo. Na B3 o lote mínimo é 100 ações. A validação deve estar no POST /api/ordens antes de processar a ordem.",
      b11: "new Date().getHours() usa o timezone do servidor, que pode ser UTC ou outro fuso. O horário correto de Brasília é UTC-3. A solução é usar toLocaleString com timeZone: 'America/Sao_Paulo'.",
      b12: "Em /api/ordens, a linha é ACOES_MOCK.push(ordem). Está mutando o array de ações em vez do array de ordens. O correto é ORDENS_MOCK.push(ordem).",
      b13: "A interface Acao usa campos como preco, ticker, nome, variacao mas a brapi.dev retorna regularMarketPrice, symbol, shortName, regularMarketChangePercent. O componente usa acao.preco que é sempre undefined.",
      b14: "O useState guarda quantidade como string (valor padrão ''). A expressão quantidade * acao.preco resulta em NaN porque é string * number. O || 0 esconde o NaN mostrando sempre R$ 0,00.",
    },
  },
  {
    displayName: "Bruno Costa",
    githubUrl: "https://github.com/brunocosta/tradedesk-lab",
    respostas: {
      b1: "Header importado duas vezes. Uma no RootLayout e outra no page.tsx da home. Removi do page.tsx.",
      b2: "BoletaForm busca os dados da ação de novo com useEffect sendo que o pai já passa via props.",
      b3: "Função não pode ser prop de Server pra Client Component. É uma limitação de serialização do React.",
      b4: "params precisa de await no Next.js 15. Sem o await o ticker fica como Promise object.",
      b5: "Route Group (protegido) tem Header no layout, mas o RootLayout já tem. Carteira mostra header duplo.",
      b6: "href='/acoes/ticker' está literal. Deveria ser dinâmico com template string.",
      b7: "Listagem de ações é Client Component com useEffect. Deve ser Server Component async.",
      b8: "COMISSAO_SECRETA no Client Component aparece no console do browser.",
      b9: "404 retornando 200. Precisa passar { status: 404 } no NextResponse.json.",
      b10: "Sem validação de quantidade mínima. Aceita 0 e negativo.",
      b11: "Horário sem timezone. Precisa converter para América/São_Paulo.",
      b12: "Push no array errado. ACOES_MOCK recebe as ordens em vez de ORDENS_MOCK.",
      b13: "Campos da interface não batem com a API real. brapi retorna regularMarketPrice não preco.",
      b14: "quantidade é string, multiplicação retorna NaN, || 0 esconde.",
    },
  },
  {
    displayName: "Carla Dias",
    githubUrl: "https://github.com/carladias/tradedesk-lab",
    respostas: {
      b1: "Duplo header na home.",
      b2: "Fetch redundante no BoletaForm.",
      b3: "Função serialização erro Server→Client.",
      b4: "await params faltando.",
      b5: "Header duplo no /carteira pelo layout do route group.",
      b6: "Link href literal não dinâmico.",
      b7: "useEffect na listagem deveria ser RSC.",
      b8: "Comissão exposta no client.",
      b9: "Status 200 quando deveria ser 404.",
      b10: "Sem validação mínimo 100 ações.",
      b11: "Timezone errado no cálculo de horário.",
      b12: "Push no array errado.",
      b13: "Campos errados preco vs regularMarketPrice.",
      b14: "String multiplicado por number = NaN.",
    },
  },
];

async function seed() {
  console.log("🌱 Inserindo submissões de teste...\n");

  for (const aluno of ALUNOS) {
    const res = await fetch(`${BASE}/api/trabalho1`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aluno),
    });

    if (res.ok) {
      console.log(`✅ ${aluno.displayName} — enviado`);
    } else {
      const err = await res.text();
      console.log(`❌ ${aluno.displayName} — erro: ${err}`);
    }
  }

  console.log("\n🎉 Seed concluído! Acesse http://localhost:3000/admin/trabalho1");
}

seed().catch(console.error);
