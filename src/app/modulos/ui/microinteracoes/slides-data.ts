import type { Slide } from "@/types/slides";

export const MICROINTERACOES_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 04",
    title: "MICRO-INTERAÇÕES\n& FEEDBACK",
    subtitle: "Do toast que se transforma sozinho à chuva de confete: o app celebra com o usuário.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Por que importa",
    title: "Silêncio é ansiedade",
    items: [
      { icon: "🤐", text: "O usuário clica em 'Salvar' e... nada acontece na tela. Salvou? Travou? Ele clica de novo — e duplica o registro." },
      { icon: "💬", text: "Feedback é a resposta do app: 'recebi', 'deu certo', 'algo falhou'. Reduz ansiedade e erros." },
      { icon: "🧩", text: "Na Aula 02 você viu o básico (toast.success, SweetAlert de confirmação). Aqui vamos ao nível profissional." },
      { icon: "🎯", text: "3 níveis: toast (discreto), alerta modal (decisão séria), celebração (conquista). Cada um com sua ferramenta." },
    ],
  },
  {
    id: 3,
    type: "diagram",
    tag: "Espectro do feedback",
    title: "Escolha a intensidade certa",
    subtitle: "Do sussurro discreto ao grito de vitória",
    layers: [
      { icon: "🍞", label: "TOAST — Sonner", desc: "Discreto, some sozinho. 'Salvo com sucesso', 'Copiado'. Não interrompe o fluxo.", color: "green", connector: "a ação é séria e precisa de decisão?" },
      { icon: "⚠️", label: "ALERTA MODAL — SweetAlert2", desc: "Bloqueia a tela e exige resposta. 'Excluir permanentemente? Sim/Não'.", color: "amber", connector: "o usuário conquistou algo especial?" },
      { icon: "🎉", label: "CELEBRAÇÃO — canvas-confetti", desc: "Recompensa visual. Fim de um desafio, cadastro concluído, conquista desbloqueada.", color: "fire" },
    ],
    tip: "Erro comum: usar modal bloqueante para 'Salvo!' (irritante) ou toast para 'Excluir conta?' (perigoso). Combine gravidade e intensidade.",
  },
  {
    id: 4,
    type: "demo",
    tag: "Sonner · Nível pro",
    title: "toast.promise e toast.custom",
    subtitle: "O favorito para operações assíncronas: um comando cobre loading → sucesso/erro. Clique e veja o toast se transformar.",
    demo: "sonner-advanced",
    code: `import { toast } from "sonner";

// Um toast que acompanha uma Promise (3 estados automáticos):
toast.promise(salvarAluno(dados), {
  loading: "Salvando aluno…",
  success: "Salvo com sucesso!",
  error: "Não foi possível salvar.",
});

// Toast 100% seu, com JSX livre:
toast.custom((t) => (
  <div className="...">Conteúdo do seu jeito</div>
));`,
    codeLabel: "sonner-avancado.tsx",
    tip: "toast.promise é o padrão para chamadas de API: você entrega a Promise e as 3 mensagens; o Sonner alterna os estados sozinho.",
  },
  {
    id: 5,
    type: "demo",
    tag: "SweetAlert2 · Nível pro",
    title: "Além do confirmar: input e toast mode",
    subtitle: "Clique: o primeiro captura um valor no próprio alerta; o segundo é um SweetAlert discreto no canto (sem bloquear).",
    demo: "sweetalert-advanced",
    code: `import Swal from "sweetalert2";

// 1) Capturar um valor do usuário no próprio alerta:
const { value: motivo } = await Swal.fire({
  title: "Motivo do cancelamento",
  input: "text",
  inputPlaceholder: "Digite o motivo…",
  showCancelButton: true,
});

// 2) "Toast mode": SweetAlert discreto no canto (sem bloquear):
const Toast = Swal.mixin({
  toast: true, position: "top-end",
  showConfirmButton: false, timer: 2500,
});
Toast.fire({ icon: "success", title: "Preferências salvas" });`,
    codeLabel: "sweetalert-avancado.tsx",
    tip: "SweetAlert também faz toasts (mixin toast:true). Na prática, muita gente usa Sonner para toasts e reserva o SweetAlert para os modais bloqueantes.",
  },
  {
    id: 6,
    type: "demo",
    tag: "canvas-confetti",
    title: "Celebrando conquistas",
    subtitle: "Confete é imperativo: você CHAMA confetti() num clique. Uma explosão de comemoração — não uma nevasca eterna.",
    demo: "confetti",
    code: `// npm install canvas-confetti
import confetti from "canvas-confetti";

// Explosão única, com a paleta fire:
confetti({
  particleCount: 120,
  spread: 70,
  origin: { y: 0.7 },
  colors: ["#FF5500", "#FF8C00", "#FFB800"],
});

// Padrão de ouro: celebração + confirmação juntas
confetti({ particleCount: 120, spread: 70 });
toast.success("🏆 Missão concluída! +50 XP");`,
    codeLabel: "celebracao.tsx",
    tip: "Diferente do Sonner/Swal, confetti() não precisa de componente montado — é uma função. Chame no momento exato da conquista.",
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "A ferramenta certa",
    question: "O usuário acabou de copiar um link para a área de transferência. Qual feedback é o mais adequado?",
    options: [
      { text: "Um modal bloqueante do SweetAlert2 com botão 'OK'", correct: false, explanation: "Exagero! Copiar um link é trivial. Parar a tela e exigir um clique irrita o usuário." },
      { text: "Um toast discreto do Sonner: 'Link copiado!'", correct: true, explanation: "Perfeito: confirma a ação, some sozinho e não interrompe. Feedback proporcional à ação." },
      { text: "Uma chuva de confete", correct: false, explanation: "Celebração é para conquistas reais. Copiar link não é um marco — o confete perde o sentido se aparecer sempre." },
      { text: "Nenhum feedback — copiar é óbvio", correct: false, explanation: "Sem confirmação, o usuário não sabe se funcionou e tenta de novo. Um toast rápido resolve." },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "concept",
    tag: "Regras de ouro",
    title: "Feedback que ajuda, não atrapalha",
    items: [
      { icon: "⏱️", text: "Toasts somem sozinhos (3-4s). Nunca exija fechar manualmente algo apenas informativo." },
      { icon: "🚫", text: "Modal bloqueante SÓ para decisões sérias/irreversíveis. Abusar treina o usuário a clicar 'OK' sem ler." },
      { icon: "🎉", text: "Celebração é rara por design: se tudo comemora, nada é especial. Guarde para conquistas reais." },
      { icon: "🎨", text: "Mantenha a identidade: cores e tom das mensagens seguem a marca (no nosso caso, o fire orange 🔥)." },
    ],
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o toast de promessa",
    instruction: "Você quer que um único toast acompanhe uma chamada async (loading → sucesso/erro). Complete o método do Sonner (ex.: toast.xxx):",
    prefix: `import { toast } from "sonner";

_____________(salvarAluno(dados), {
  loading: "Salvando…",
  success: "Salvo!",
  error: "Falhou.",
});`,
    answer: "toast.promise",
    hint: "É o objeto toast + o método que recebe uma Promise e as 3 mensagens.",
    xp: 20,
  },
  {
    id: 10,
    type: "demo",
    tag: "🔥 Projeto do módulo",
    title: "O projeto até aqui: celebra",
    subtitle: "A Central On Fire agora responde: 'Começar' usa toast.promise, 'Concluir missão' solta confete + toast, e sair da turma pede confirmação no SweetAlert.",
    demo: "projeto-4",
    tip: "Repare no espectro: toast para o comum, confete para a conquista, modal bloqueante para a ação destrutiva. Cada feedback no seu peso.",
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão 12",
    title: "APP QUE\nCELEBRA",
    subtitle: "Dê voz à sua interface nos 3 níveis",
    tasks: [
      "Instale canvas-confetti (sonner e sweetalert2 já vêm da Aula 02); mantenha o <Toaster /> no layout",
      "Num botão 'Salvar', use toast.promise numa operação async simulada (setTimeout) com loading/success/error",
      "Crie um toast.custom com JSX próprio (ícone Lucide + texto no padrão zinc/orange)",
      "Num botão 'Excluir', confirme com SweetAlert2 antes de agir — e dispare um toast.success depois",
      "Crie um botão 'Concluir desafio' que dispara confetti() com a paleta fire",
      "Garanta que cada feedback combina com a gravidade da ação (toast x modal x confete)",
    ],
    bonus: [
      "Combine: ao concluir o desafio, dispare confete E um toast.success juntos",
      "Faça 'canhões laterais' de confete com requestAnimationFrame por ~1s",
    ],
    xp: 50,
    nextHref: "/modulos/ui/dashboards",
    nextLabel: "Aula 05: Visualização de Dados →",
  },
];
