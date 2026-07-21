import type { Slide } from "@/types/slides";

export const AULA_03_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 01 · Aula 01 · Parte 3",
    title: "NODE NO\nMUNDO REAL",
    subtitle: "Comparações honestas, casos de uso — e a ponte para o Next.js.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Os concorrentes",
    title: "Quatro filosofias de servidor",
    items: [
      { icon: "🐘", text: "PHP: um processo por requisição — nasce, roda o script, morre. Simples e robusto; o modelo da web clássica (WordPress roda 40% da internet)." },
      { icon: "☕", text: "Java/Spring: pool de threads — várias requisições em paralelo de verdade. Poderoso e corporativo, mas pesado e verboso." },
      { icon: "🐍", text: "Python/Django: síncrono por padrão (o GIL limita as threads); o mundo async chegou depois, com asyncio e FastAPI." },
      { icon: "🟢", text: "Node.js: uma thread + event loop — nunca espera. Ideal para muitas conexões simultâneas fazendo I/O." },
    ],
  },
  {
    id: 3,
    type: "files",
    tag: "Visual",
    title: "A mesma carga, dois modelos",
    codeLabel: "threads vs event loop",
    code: `MODELO TRADICIONAL — 1 thread por cliente

  Cliente A ──▶ 🧵 Thread A ░░░ esperando o banco...  🕐
  Cliente B ──▶ 🧵 Thread B ░░░ esperando o disco...  🕐
  Cliente C ──▶ 🧵 Thread C ░░░ esperando a rede...   🕐
  Cliente D ──▶ ❌ sem threads livres — aguarde!


NODE.JS — 1 thread para todos

  Cliente A ─┐
  Cliente B ─┤                     ┌──▶ 🍳 libuv / SO
  Cliente C ─┼──▶ ⚡ EVENT LOOP ───┤    (I/O em paralelo)
  Cliente D ─┘     nunca espera    └──▶ 🔔 callbacks prontos`,
    tip: "As threads tradicionais passam a vida esperando. O event loop transforma cada espera em vaga para o próximo cliente.",
  },
  {
    id: 4,
    type: "comparison",
    tag: "Trade-offs",
    title: "Escolhendo com critério",
    left: {
      label: "Threads (Java, C#, PHP)",
      items: [
        "Paralelismo real de CPU",
        "Ótimo para cálculo pesado",
        "Mais memória por conexão",
        "Ecossistemas maduros e corporativos",
        "Duas linguagens: front ≠ back",
      ],
    },
    right: {
      label: "Event loop (Node.js)",
      items: [
        "Milhares de conexões por processo",
        "Perfeito para I/O intenso",
        "Pouquíssima memória por conexão",
        "JavaScript no front e no back",
        "APIs, tempo real e streaming",
      ],
    },
    tip: "Não existe vencedor absoluto — existe a ferramenta certa para cada tipo de carga. Engenharia é escolher trade-offs.",
  },
  {
    id: 5,
    type: "concept",
    tag: "Pontos fortes",
    title: "O habitat natural do Node",
    items: [
      { icon: "🔌", text: "APIs REST e GraphQL: muitas requisições, quase todas esperando banco ou rede — I/O puro." },
      { icon: "💬", text: "Tempo real: chats, notificações, jogos — WebSockets com milhares de conexões abertas ao mesmo tempo." },
      { icon: "📺", text: "Streaming: processar dados em pedaços (streams) sem carregar tudo na memória." },
      { icon: "🛠️", text: "Tooling: Vite, ESLint, Prettier, Tailwind e o próprio Next.js — TODA a build do frontend moderno roda em Node." },
    ],
  },
  {
    id: 6,
    type: "concept",
    tag: "Pontos fracos",
    title: "Onde o Node não é a melhor escolha",
    items: [
      { icon: "🎞️", text: "CPU-bound: converter vídeo, processar imagem, machine learning — trava o event loop (lembra da aula 02?)." },
      { icon: "🧮", text: "Computação científica e dados: Python (NumPy, PyTorch) e C++ dominam esse território com razão." },
      { icon: "🏎️", text: "Paralelismo pesado de CPU: Go, Rust e Java usam todos os núcleos do processador nativamente." },
      { icon: "🛟", text: "Precisa mesmo fazer isso em Node? worker_threads e filas (BullMQ) tiram o peso da thread principal." },
    ],
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "Decisão de arquitetura",
    question:
      "Sua startup vai construir estes 4 produtos. Em qual deles o Node.js seria a escolha mais QUESTIONÁVEL?",
    options: [
      {
        text: "API REST do aplicativo de delivery",
        correct: false,
        explanation: "Caso clássico de Node: muitas requisições curtas, todas esperando banco e serviços externos.",
      },
      {
        text: "Chat de suporte em tempo real",
        correct: false,
        explanation: "WebSockets + milhares de conexões abertas = exatamente o ponto forte do event loop.",
      },
      {
        text: "Serviço que converte os vídeos 4K enviados pelos usuários",
        correct: true,
        explanation: "Conversão de vídeo é CPU-bound: ocuparia a única thread por minutos. Aqui, Go/Rust ou uma fila com workers dedicados servem melhor.",
      },
      {
        text: "Dashboard que agrega dados de 5 APIs externas",
        correct: false,
        explanation: "Agregação de APIs é I/O puro — o Node dispara as 5 chamadas em paralelo sem esforço.",
      },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "concept",
    tag: "Mercado",
    title: "Quem aposta no Node (e por quê)",
    items: [
      { icon: "🎬", text: "Netflix: usa Node na interface e na camada de API — o tempo de startup caiu de ~40 minutos (Java) para segundos." },
      { icon: "🚗", text: "Uber, LinkedIn e PayPal migraram serviços para Node atrás de performance de I/O e produtividade dos times." },
      { icon: "🛒", text: "Mercado Livre, iFood, Nubank: Node é presença constante nas vagas de backend do mercado brasileiro." },
      { icon: "🧑‍💻", text: "O argumento matador: UMA linguagem do banco ao botão. O mesmo dev transita por todo o produto — é o dev fullstack." },
    ],
  },
  {
    id: 9,
    type: "diagram",
    tag: "A ponte",
    title: "Onde o Next.js entra nessa história",
    subtitle: "A pilha completa do seu projeto neste curso",
    layers: [
      {
        icon: "⚡",
        label: "NEXT.JS",
        desc: "Framework: rotas, SSR, build — o que você domina a partir do próximo módulo",
        color: "fire",
        connector: "construído sobre",
      },
      {
        icon: "⚛️",
        label: "REACT",
        desc: "Biblioteca de interface: componentes, estado, hooks",
        color: "blue",
        connector: "executado por",
      },
      {
        icon: "🟢",
        label: "NODE.JS",
        desc: "Runtime: roda o servidor do Next, os Server Components e todo o tooling",
        color: "green",
        connector: "que roda sobre",
      },
      {
        icon: "🖥️",
        label: "V8 + LIBUV + SO",
        desc: "Motor, event loop e a máquina de verdade",
        color: "neutral",
      },
    ],
    tip: "npm run dev sobe um servidor Node. Server Component executa no Node. Build é Node. Você nunca sai do Node — só sobe de andar.",
  },
  {
    id: 10,
    type: "definition",
    tag: "Conexão",
    title: "A ponte para o próximo módulo",
    quote:
      "O Next.js é um framework que roda nesse runtime: cada npm run dev, cada Server Component e cada API Route que você criar estará sendo executado pelo Node.js que você acabou de entender.",
    highlights: ["roda nesse runtime", "executado pelo Node.js"],
  },
  {
    id: 11,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o comando",
    instruction:
      "No projeto Next.js, qual comando (definido nos scripts do package.json) sobe o servidor de desenvolvimento — que é um processo Node?",
    prefix: `$ _______________

  ▲ Next.js 16
  - Local: http://localhost:3000`,
    answer: "npm run dev",
    hint: "É um script npm. Você vai executá-lo todos os dias deste curso.",
    xp: 20,
  },
  {
    id: 12,
    type: "mini-challenge",
    tag: "🎯 Missão 03",
    title: "SERVIDOR\nNA UNHA",
    subtitle: "Crie um servidor HTTP com Node puro — e valorize o que o Next faz por você",
    tasks: [
      'Crie servidor.js importando http de "node:http"',
      'Use http.createServer((req, res) => ...) para responder { "status": "on fire" } em JSON',
      "Escute na porta 3000 e teste no navegador: http://localhost:3000",
      'Crie uma "rota" na mão: se req.url === "/alunos", responda uma lista de nomes',
      "Observe o que falta: sem roteador, sem hot reload, sem componentes — tudo manual",
    ],
    bonus: [
      "Responda HTML em vez de JSON e veja o navegador renderizar",
      "Instale o nodemon e faça o servidor reiniciar sozinho a cada save",
    ],
    xp: 50,
    nextHref: "/modulos/infra/typescript",
    nextLabel: "Aula 02: Tipagem Estática (TypeScript) →",
  },
];
