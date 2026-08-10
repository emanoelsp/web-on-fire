import type { Slide } from "@/types/slides";

export const FIRESTORE_LEITURA_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 04 · Aula 02",
    title: "FIRESTORE:\nLEITURA & MODELAGEM",
    subtitle: "Um banco NoSQL na nuvem — pense em coleções e documentos, não em tabelas.",
  },
  {
    id: 2,
    type: "concept",
    tag: "NoSQL",
    title: "Saindo do mundo das tabelas",
    items: [
      { icon: "📊", text: "Banco relacional (SQL): tudo em tabelas rígidas com linhas e colunas fixas, ligadas por JOINs." },
      { icon: "📁", text: "Firestore (NoSQL): dados em documentos JSON flexíveis, agrupados em coleções. Cada documento pode ter campos diferentes." },
      { icon: "🌳", text: "A estrutura é uma árvore: coleção → documento → (campos + subcoleções). Como pastas e arquivos." },
      { icon: "⚡", text: "Vantagens: flexível, escala sozinho, sincroniza em tempo real. Trade-off: você modela pensando em COMO vai LER." },
    ],
  },
  {
    id: 3,
    type: "diagram",
    tag: "Estrutura",
    title: "A hierarquia do Firestore",
    subtitle: "Coleção contém documentos, que contêm campos (e subcoleções)",
    layers: [
      {
        icon: "🗂️",
        label: "COLEÇÃO — \"alunos\"",
        desc: "Um agrupamento de documentos do mesmo tipo",
        color: "fire",
        connector: "contém vários",
      },
      {
        icon: "📄",
        label: "DOCUMENTO — id \"abc123\"",
        desc: "Um registro identificado por um ID único",
        color: "amber",
        connector: "guarda",
      },
      {
        icon: "🔤",
        label: "CAMPOS",
        desc: "{ nome: \"Ana\", xp: 350, badges: [...] } — os dados em si",
        color: "green",
      },
    ],
    loopBack: "um documento pode ter subcoleções — árvore aninhada",
    tip: "Caminho de um documento: alunos/abc123. De um campo dentro dele: alunos/abc123 → xp. Simples e previsível.",
  },
  {
    id: 4,
    type: "concept",
    tag: "Modelagem",
    title: "A regra de ouro do NoSQL",
    items: [
      { icon: "👀", text: "Modele pensando em COMO você vai LER os dados, não em como armazená-los 'corretamente'." },
      { icon: "📑", text: "Tela mostra lista de alunos com XP? Então cada aluno é um documento com o XP dentro — leitura de 1 coleção." },
      { icon: "🔁", text: "Duplicar dado é OK no NoSQL (desnormalização): melhor guardar o nome do autor no post do que fazer JOIN." },
      { icon: "🎯", text: "Neste curso: coleções alunos, progresso, atividade — cada uma pensada para uma tela específica do professor/aluno." },
    ],
  },
  {
    id: 5,
    type: "code",
    tag: "Leitura",
    title: "Lendo um documento e uma coleção",
    codeLabel: "services/alunoService.ts",
    code: `import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Ler UM documento pelo id
export async function getAluno(id: string) {
  const snap = await getDoc(doc(db, "alunos", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// Ler uma COLEÇÃO inteira
export async function getAlunos() {
  const snap = await getDocs(collection(db, "alunos"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}`,
    tip: "snap.exists() protege contra id inexistente. E snap.id traz o ID do documento — separado dos data() (os campos).",
  },
  {
    id: 6,
    type: "code",
    tag: "Consultas",
    title: "Filtrando com queries",
    codeLabel: "queries.ts",
    code: `import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

// Alunos com XP >= 500, do maior para o menor, os 10 primeiros
const q = query(
  collection(db, "alunos"),
  where("xp", ">=", 500),
  orderBy("xp", "desc"),
  limit(10)
);

const snap = await getDocs(q);
const ranking = snap.docs.map((d) => ({ id: d.id, ...d.data() }));`,
    tip: "where + orderBy em campos diferentes às vezes exige um índice composto — o Firebase te dá um link no console para criar com 1 clique.",
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "Pensando em NoSQL",
    question: "Você tem uma tela que lista posts com o nome do autor em cada card. Qual a melhor modelagem no Firestore?",
    options: [
      {
        text: "Guardar só o autorId e buscar o nome numa 2ª consulta por post",
        correct: false,
        explanation: "Isso é pensamento relacional (JOIN). Numa lista de 20 posts, seriam 21 leituras — lento e caro.",
      },
      {
        text: "Guardar o autorNome direto no documento do post (desnormalização)",
        correct: true,
        explanation: "Exato! No NoSQL, duplicar o nome no post é o certo: a lista carrega com UMA leitura da coleção. Modele para a leitura.",
      },
      {
        text: "Criar uma tabela de junção posts_autores",
        correct: false,
        explanation: "Tabelas de junção são conceito SQL. O Firestore não faz JOINs — a solução é desnormalizar.",
      },
      {
        text: "Fazer um JOIN entre as coleções posts e autores",
        correct: false,
        explanation: "O Firestore não tem JOIN. Você lê coleções separadas ou desnormaliza os dados que precisa juntos.",
      },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "code",
    tag: "Integração",
    title: "Firestore + Server Component",
    codeLabel: "app/ranking/page.tsx",
    code: `// Server Component: busca no servidor e renderiza (Módulo 02!)
import { getAlunos } from "@/services/alunoService";

export default async function RankingPage() {
  const alunos = await getAlunos();
  const ranking = alunos.sort((a, b) => b.xp - a.xp);

  return (
    <ol>
      {ranking.map((aluno) => (
        <li key={aluno.id}>
          {aluno.nome} — {aluno.xp} XP
        </li>
      ))}
    </ol>
  );
}`,
    tip: "Tudo se conecta: a camada de serviço (Módulo 06) agora lê do Firestore em vez do mock, e o Server Component (Módulo 02) renderiza. A página nem mudou.",
  },
  {
    id: 9,
    type: "concept",
    tag: "Tempo real",
    title: "O superpoder: onSnapshot",
    items: [
      { icon: "📡", text: "getDocs lê uma vez. onSnapshot ESCUTA: o callback dispara toda vez que o dado muda no banco." },
      { icon: "⚡", text: "O professor muda o XP de um aluno? A tela do aluno atualiza sozinha, sem recarregar. Mágica do BaaS." },
      { icon: "🔌", text: "onSnapshot retorna uma função de unsubscribe — sempre limpe o listener no cleanup do useEffect." },
      { icon: "🎯", text: "É assim que o progresso deste curso sincroniza: watchUserProgress usa onSnapshot por baixo." },
    ],
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete a leitura",
    instruction:
      "Complete a função do Firestore que lê TODOS os documentos de uma coleção de uma vez (digite só o nome da função):",
    prefix: `import { collection, _________ } from "firebase/firestore";

const snap = await _________(collection(db, "alunos"));`,
    answer: "getDocs",
    hint: "É 'get' + 'Docs' (plural — coleção inteira).",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 15",
    title: "BANCO VIVO",
    subtitle: "Modele, popule e leia dados reais",
    tasks: [
      "No Firebase Console, crie o Firestore em modo de teste",
      "Crie manualmente uma coleção 'produtos' com 4-5 documentos (nome, preco, categoria)",
      "Crie services/produtoService.ts com getProdutos() e getProduto(id) lendo do Firestore",
      "Página /loja (Server Component) que lista os produtos vindos do banco",
      "Página /loja/[id] que lê um produto pelo id (notFound se não existir)",
      "Adicione uma query: getProdutosPorCategoria(cat) com where(\"categoria\", \"==\", cat)",
    ],
    bonus: [
      "Substitua o mock data do desafio do Módulo 02 pela leitura real do Firestore — sem mudar as páginas",
      "Crie uma versão em tempo real com onSnapshot num Client Component",
    ],
    xp: 50,
    nextHref: "/modulos/dados/firestore-escrita",
    nextLabel: "Aula 03: Firestore (Escrita) →",
  },
];
