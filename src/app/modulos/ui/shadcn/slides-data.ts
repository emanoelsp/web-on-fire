import type { Slide } from "@/types/slides";

export const SHADCN_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 03",
    title: "HEADLESS UI\n& SHADCN/UI",
    subtitle: "Componentes acessíveis de verdade — e você continua dono do visual e do código.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema difícil",
    title: "Por que não fazer TUDO na mão?",
    items: [
      { icon: "♿", text: "Acessibilidade é difícil: um modal correto prende o foco, fecha no Esc, avisa leitores de tela (ARIA). Fácil de errar." },
      { icon: "⌨️", text: "Um dropdown de verdade navega por setas do teclado, faz wrap no fim da lista, fecha ao clicar fora. Muita lógica." },
      { icon: "🎨", text: "Bibliotecas prontas (Material UI, Bootstrap) resolvem isso — mas impõem a APARÊNCIA delas. Brigar com o estilo dói." },
      { icon: "💡", text: "Headless UI separou as coisas: entrega o COMPORTAMENTO (acessível, testado) e deixa o VISUAL 100% com você." },
    ],
  },
  {
    id: 3,
    type: "comparison",
    tag: "Dois mundos",
    title: "Biblioteca tradicional vs Headless",
    left: {
      label: "UI tradicional (MUI, Bootstrap)",
      items: ["Vem estilizada — visual pronto", "Difícil de customizar a fundo", "Você luta contra o CSS dela", "Bundle grande, tema próprio", "Seu app parece 'template'"],
    },
    right: {
      label: "Headless (Radix, Headless UI)",
      items: ["Zero estilo — só comportamento", "Você estiliza com Tailwind", "Acessibilidade de fábrica", "Visual 100% da sua marca", "Seu app parece SEU"],
    },
    tip: "Headless = 'sem cabeça (visual)'. Entrega a lógica acessível; a aparência é sua responsabilidade — e sua liberdade.",
  },
  {
    id: 4,
    type: "concept",
    tag: "Shadcn/UI",
    title: "A ideia genial do Shadcn/UI",
    items: [
      { icon: "📦", text: "Shadcn NÃO é uma dependência que você instala e importa. É uma coleção de componentes que você COPIA para o projeto." },
      { icon: "🏠", text: "O código do Button, Dialog, Input vai para components/ui/ — dentro do SEU repositório. Você é o dono." },
      { icon: "🔧", text: "Precisa mudar algo? Edite o arquivo. Sem esperar release, sem sobrescrever CSS de terceiros, sem !important." },
      { icon: "🧬", text: "Por baixo usa Radix UI (headless) + Tailwind + o cn() da Aula 02. Os próximos slides mostram o Radix cru, ao vivo." },
    ],
  },
  {
    id: 5,
    type: "demo",
    tag: "Radix · Dialog",
    title: "Um modal acessível, ao vivo",
    subtitle: "Isto é Radix cru, estilizado por nós com Tailwind. Abra e teste: Esc fecha, foco fica preso, scroll trava.",
    demo: "radix-dialog",
    code: `import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/Button";

export function ConfirmarExclusao() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Excluir conta</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2
                     -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900
                     p-6 shadow-2xl focus:outline-none">
          <Dialog.Title className="text-lg font-bold text-zinc-100">
            Tem certeza absoluta?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-zinc-400">
            Esta ação não pode ser desfeita.
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild><Button variant="ghost">Cancelar</Button></Dialog.Close>
            <Dialog.Close asChild>
              <Button className="bg-red-600 hover:bg-red-700">Sim, excluir</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`,
    codeLabel: "ConfirmarExclusao.tsx (fiel ao demo acima)",
    tip: "Você não escreveu NENHUMA lógica de abrir/fechar/foco/Esc. O Radix cuida. Você só compôs e estilizou com as classes da Aula 01.",
  },
  {
    id: 6,
    type: "demo",
    tag: "Radix · Dropdown",
    title: "Menu navegável pelo teclado",
    subtitle: "Abra e use as setas ↑ ↓ + Enter. O Radix marca o item focado com data-[highlighted]; você só pinta.",
    demo: "radix-dropdown",
    code: `import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

<DropdownMenu.Item
  className="... data-[highlighted]:bg-orange-500/15
             data-[highlighted]:text-orange-300">
  <User size={16} /> Meu perfil
</DropdownMenu.Item>`,
    codeLabel: "Radix DropdownMenu",
    tip: "data-[state] e data-[highlighted] são atributos que o Radix coloca no DOM. Você estiliza os estados com variantes do Tailwind — sem JS.",
  },
  {
    id: 7,
    type: "demo",
    tag: "Radix · Tooltip + Switch",
    title: "Peças pequenas, acessibilidade grande",
    subtitle: "O tooltip aparece no hover E no foco (teclado). O switch expõe data-[state=checked] para você animar.",
    demo: "radix-tooltip-switch",
    code: `import * as Switch from "@radix-ui/react-switch";

<Switch.Root className="... data-[state=checked]:bg-orange-500">
  <Switch.Thumb
    className="... transition-transform
               data-[state=checked]:translate-x-[22px]" />
</Switch.Root>`,
    codeLabel: "Radix Switch",
    tip: "Um <input type=checkbox> estilizado dá muito trabalho e acessibilidade frágil. O Switch do Radix já vem com role, teclado e foco corretos.",
  },
  {
    id: 8,
    type: "demo",
    tag: "Radix · Accordion",
    title: "Accordion com animação de seta",
    subtitle: "group-data-[state=open] gira a seta quando o item abre. Tudo navegável por Tab e setas.",
    demo: "radix-accordion",
    code: `<Accordion.Trigger className="group ...">
  {pergunta}
  <ChevronDown className="transition-transform
                         group-data-[state=open]:rotate-180" />
</Accordion.Trigger>`,
    codeLabel: "Radix Accordion",
    tip: "O prefixo group + group-data-[state=open] deixa o filho (a seta) reagir ao estado do pai (o item aberto). Padrão pouco conhecido e poderosíssimo.",
  },
  {
    id: 9,
    type: "code",
    tag: "Setup",
    title: "É aqui que o Shadcn entra",
    codeLabel: "terminal",
    code: `# Você VIU o Radix cru. O Shadcn embrulha exatamente isso,
# já estilizado e pronto pra copiar para o SEU projeto.

npx shadcn@latest init          # configura (usa o cn() da Aula 02)
npx shadcn@latest add dialog    # cria components/ui/dialog.tsx (seu!)
npx shadcn@latest add dropdown-menu button input

# Uso normal, e o arquivo é editável:
import { Dialog, DialogContent } from "@/components/ui/dialog";`,
    tip: "Você instala só o que usa. Cada 'add' é um arquivo no SEU controle — Radix + Tailwind + cn() já montados. Nada de biblioteca de 300 componentes.",
  },
  {
    id: 10,
    type: "quiz",
    tag: "Quiz",
    title: "Entendendo o Shadcn",
    question: "Qual afirmação sobre o Shadcn/UI é a correta?",
    options: [
      { text: "É uma dependência no package.json que você importa como qualquer lib", correct: false, explanation: "Esse é o modelo tradicional. O Shadcn COPIA o código-fonte para o seu projeto — você vira o dono dos arquivos." },
      { text: "Copia o código dos componentes para o seu projeto, e você pode editá-los", correct: true, explanation: "Exato! Componentes acessíveis (via Radix) que viram SEUS arquivos em components/ui/, livres para editar." },
      { text: "É um tema visual fixo que não pode ser alterado", correct: false, explanation: "Ao contrário: como o código é seu e usa Tailwind, você muda o que quiser." },
      { text: "Substitui o Tailwind por um sistema de estilo próprio", correct: false, explanation: "Ele USA o Tailwind (e o cn()) para estilizar. Se apoia no que você já sabe." },
    ],
    xp: 15,
  },
  {
    id: 11,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o comando",
    instruction: "Complete o comando que adiciona o componente de modal (dialog) do Shadcn ao seu projeto:",
    prefix: `$ npx shadcn@latest _____ dialog`,
    answer: "add",
    hint: "É o subcomando que 'adiciona' um componente aos seus arquivos.",
    xp: 20,
  },
  {
    id: 12,
    type: "demo",
    tag: "🔥 Projeto do módulo",
    title: "O projeto até aqui: acessível",
    subtitle: "A Central On Fire ganhou um header de verdade: menu de usuário (dropdown), switch de notificações e um modal de login — tudo Radix, navegável por teclado.",
    demo: "projeto-3",
    tip: "Abra o menu do avatar e o 'Entrar'. Toda a acessibilidade (foco, Esc, setas) veio de graça do Radix — você só compôs e pintou.",
  },
  {
    id: 13,
    type: "mini-challenge",
    tag: "🎯 Missão 11",
    title: "UI ACESSÍVEL",
    subtitle: "Deixe o Radix trabalhar por você",
    tasks: [
      "Rode npx shadcn@latest init (note que ele reaproveita/cria o lib/utils.ts com cn())",
      "Adicione os componentes: button, input, dialog e dropdown-menu",
      "Monte um modal de confirmação (Dialog) que abre ao clicar em 'Excluir'",
      "Teste a acessibilidade: abra o modal, feche com Esc, navegue com Tab; no dropdown use as setas",
      "Adicione um Switch (ou copie o do Shadcn) para uma preferência (ex.: notificações)",
      "Customize a cor de um botão editando diretamente components/ui/button.tsx — você é o dono",
    ],
    bonus: [
      "Adicione validação a um formulário com React Hook Form + Zod (o Form do Shadcn integra os dois)",
      "Troque o Dialog por um Sheet (gaveta lateral) e compare a experiência",
    ],
    xp: 50,
    nextHref: "/modulos/ui/microinteracoes",
    nextLabel: "Aula 04: Micro-interações →",
  },
];
