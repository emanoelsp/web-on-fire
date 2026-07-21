import type { Slide } from "@/types/slides";

export const SHADCN_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 11",
    title: "HEADLESS UI\n& SHADCN/UI",
    subtitle: "Componentes acessíveis, prontos e — o pulo do gato — donos do seu código.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema difícil",
    title: "Por que não fazer TUDO na mão?",
    items: [
      { icon: "♿", text: "Acessibilidade é difícil: um modal correto prende o foco, fecha no Esc, avisa leitores de tela (ARIA). Fácil de errar." },
      { icon: "⌨️", text: "Um dropdown de verdade navega por setas do teclado, wrap no fim da lista, fecha ao clicar fora. Muita lógica." },
      { icon: "🎨", text: "Bibliotecas prontas (Material UI, Bootstrap) resolvem isso — mas impõem a APARÊNCIA delas. Brigar com o estilo é doloroso." },
      { icon: "💡", text: "Headless UI separou as duas coisas: entrega o COMPORTAMENTO (acessível, testado) e deixa o VISUAL 100% com você." },
    ],
  },
  {
    id: 3,
    type: "comparison",
    tag: "Dois mundos",
    title: "Biblioteca tradicional vs Headless",
    left: {
      label: "UI tradicional (MUI, Bootstrap)",
      items: [
        "Vem estilizada — visual pronto",
        "Difícil de customizar a fundo",
        "Você luta contra o CSS dela",
        "Bundle grande, tema próprio",
        "Seu app parece 'template'",
      ],
    },
    right: {
      label: "Headless (Radix, Headless UI)",
      items: [
        "Zero estilo — só comportamento",
        "Você estiliza com Tailwind",
        "Acessibilidade de fábrica",
        "Visual 100% da sua marca",
        "Seu app parece SEU",
      ],
    },
    tip: "Headless = 'sem cabeça (visual)'. Entrega a lógica acessível; a aparência é sua responsabilidade — e sua liberdade.",
  },
  {
    id: 4,
    type: "concept",
    tag: "Shadcn/UI",
    title: "A ideia genial do Shadcn/UI",
    items: [
      { icon: "📦", text: "Shadcn NÃO é uma dependência que você instala e importa. É uma coleção de componentes que você COPIA para o seu projeto." },
      { icon: "🏠", text: "O código do Button, Dialog, Input vai para components/ui/ — dentro do SEU repositório. Você é o dono." },
      { icon: "🔧", text: "Precisa mudar algo? Edite o arquivo. Sem esperar release, sem sobrescrever CSS de terceiros, sem !important." },
      { icon: "🧬", text: "Por baixo usa Radix UI (headless, acessível) + Tailwind + o cn() da aula passada. Você já entende as peças!" },
    ],
  },
  {
    id: 5,
    type: "code",
    tag: "Setup",
    title: "Adicionando componentes",
    codeLabel: "terminal",
    code: `# Inicializa o Shadcn no projeto (uma vez)
npx shadcn@latest init
# → pergunta cor base, cria lib/utils.ts com o cn(), configura tudo

# Adiciona SÓ os componentes que você quer — eles viram arquivos seus
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input form

# Resultado: os arquivos aparecem em components/ui/
#   components/ui/button.tsx   ← seu, editável
#   components/ui/dialog.tsx   ← seu, editável

# Uso normal, como qualquer componente:
import { Button } from "@/components/ui/button";
<Button variant="destructive">Excluir</Button>`,
    tip: "Você instala só o que usa. Nada de importar uma biblioteca de 300 componentes para usar 3. Cada add é um arquivo no seu controle.",
  },
  {
    id: 6,
    type: "code",
    tag: "Na prática",
    title: "Um modal acessível em minutos",
    codeLabel: "ConfirmarExclusao.tsx",
    code: `import {
  Dialog, DialogContent, DialogTrigger,
  DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmarExclusao() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir conta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza absoluta?</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-slate-500">Esta ação não pode ser desfeita.</p>
        <DialogFooter>
          <Button variant="ghost">Cancelar</Button>
          <Button variant="destructive">Sim, excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// Grátis: foco preso no modal, fecha no Esc, clique fora, ARIA correto.`,
    tip: "Repare: você não escreveu NENHUMA lógica de abrir/fechar/foco. O Radix cuida. Você só compôs e estilizou.",
  },
  {
    id: 7,
    type: "quiz",
    tag: "Quiz",
    title: "Entendendo o Shadcn",
    question: "Qual afirmação sobre o Shadcn/UI é a correta?",
    options: [
      {
        text: "É uma dependência no package.json que você importa como qualquer lib",
        correct: false,
        explanation: "Esse é o modelo tradicional. O Shadcn COPIA o código-fonte para o seu projeto — você vira o dono dos arquivos.",
      },
      {
        text: "Copia o código dos componentes para o seu projeto, e você pode editá-los",
        correct: true,
        explanation: "Exato! É a proposta central: componentes acessíveis (via Radix) que viram SEUS arquivos em components/ui/, livres para editar.",
      },
      {
        text: "É um tema visual fixo que não pode ser alterado",
        correct: false,
        explanation: "Ao contrário: como o código é seu e usa Tailwind, você muda o que quiser.",
      },
      {
        text: "Substitui o Tailwind por um sistema de estilo próprio",
        correct: false,
        explanation: "Ele USA o Tailwind (e o cn()) para estilizar. Não substitui nada — se apoia no que você já sabe.",
      },
    ],
    xp: 15,
  },
  {
    id: 8,
    type: "concept",
    tag: "Ecossistema",
    title: "O que você ganha de fábrica",
    items: [
      { icon: "📝", text: "Formulários: Form + React Hook Form + Zod para validação tipada, com mensagens de erro acessíveis." },
      { icon: "🪟", text: "Overlays: Dialog, Sheet (gaveta lateral), Popover, Tooltip, Dropdown — todos com foco e teclado corretos." },
      { icon: "🎚️", text: "Inputs ricos: Select, Combobox, Checkbox, Switch, Slider, Calendar — o que dá trabalho fazer na mão." },
      { icon: "🍞", text: "Feedback: Toast/Sonner e Skeleton para loading — ponte perfeita para a próxima aula." },
    ],
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o comando",
    instruction:
      "Complete o comando que adiciona o componente de modal (dialog) do Shadcn ao seu projeto:",
    prefix: `$ npx shadcn@latest _____ dialog`,
    answer: "add",
    hint: "É o subcomando que 'adiciona' um componente aos seus arquivos.",
    xp: 20,
  },
  {
    id: 10,
    type: "mini-challenge",
    tag: "🎯 Missão 11",
    title: "UI ACESSÍVEL",
    subtitle: "Deixe o Radix trabalhar por você",
    tasks: [
      "Rode npx shadcn@latest init no projeto (note que ele cria/atualiza o lib/utils.ts com cn())",
      "Adicione os componentes: button, input, dialog e form",
      "Crie um formulário de cadastro usando os componentes Input e Button do Shadcn",
      "Crie um modal de confirmação (Dialog) que abre ao clicar em 'Excluir'",
      "Teste a acessibilidade: abra o modal e feche com a tecla Esc, navegue com Tab",
      "Customize a cor de um botão editando diretamente o components/ui/button.tsx",
    ],
    bonus: [
      "Adicione validação ao formulário com React Hook Form + Zod (o Form do Shadcn integra os dois)",
      "Troque o Dialog por um Sheet (gaveta lateral) e compare a experiência",
    ],
    xp: 50,
    nextHref: "/modulos/ui/microinteracoes",
    nextLabel: "Aula 12: Micro-interações →",
  },
];
