import type { Slide } from "@/types/slides";

export const COMPONENTES_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 03 · Aula 02",
    title: "ÍCONES,\nCOMPONENTES\n& FEEDBACK",
    subtitle: "Ícones que falam, um botão para governar todos, e a UI respondendo ao usuário.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Da Aula 01 pra cá",
    title: "O botão ficou lindo. E agora?",
    items: [
      { icon: "🎨", text: "Na Aula 01 você estilizou um botão de fogo com classes. Mas copiou aquele bloco de classes em 12 lugares." },
      { icon: "😰", text: "O designer mudou o raio da borda: são 12 edições manuais e você vai esquecer uma. A UI racha." },
      { icon: "🧩", text: "Hoje: encapsular esse visual num componente <Button>, turbinar com ícones, e fazer o botão FALAR (feedback)." },
      { icon: "👀", text: "Tudo ao vivo: ícones reais renderizados, variantes clicáveis e toasts/alertas que disparam de verdade." },
    ],
  },
  {
    id: 3,
    type: "demo",
    tag: "Ícones · Lucide",
    title: "Ícones são componentes React",
    subtitle: "Esqueça emoji e SVG solto. Lucide traz +1500 ícones com traço consistente — cada um é um componente.",
    demo: "lucide-gallery",
    code: `// npm install lucide-react
import { Flame, Rocket, Bell, Search } from "lucide-react";

// Cada ícone é um componente: use como qualquer JSX
<Flame />
<Rocket />`,
    codeLabel: "usando-icones.tsx",
    tip: "Passe o mouse nos ícones acima — eles reagem porque são SVG inline dentro de um card estilizado com Tailwind.",
  },
  {
    id: 4,
    type: "demo",
    tag: "Ícones · Estilização",
    title: "Tamanho, cor e traço",
    subtitle: "Como são SVG inline, ícones herdam a cor do texto (currentColor). text-orange-500 pinta o ícone junto.",
    demo: "icon-styling",
    code: `<Flame size={32} />                          {/* tamanho em px */}
<Flame size={32} className="text-orange-500" /> {/* cor via text-* */}
<Flame size={32} strokeWidth={1} />          {/* espessura do traço */}
<Loader2 className="animate-spin" />         {/* spinner instantâneo */}`,
    codeLabel: "estilizando-icones.tsx",
    tip: "Truque de ouro: QUALQUER ícone + a classe animate-spin do Tailwind vira um spinner de loading. Loader2 é o mais usado.",
  },
  {
    id: 5,
    type: "demo",
    tag: "Ícones · Em botões",
    title: "Ícone + texto: o combo do produto",
    subtitle: "Um ícone à esquerda do texto guia o olho. Use flex items-center gap-2 para alinhar perfeitamente.",
    demo: "icon-button",
    code: `<button className="inline-flex items-center gap-2 ...">
  <LogIn size={18} /> Entrar
</button>

// Botão só-ícone? Sempre com aria-label (acessibilidade!)
<button aria-label="Configurações" className="...">
  <Settings size={16} />
</button>`,
    codeLabel: "icon-button.tsx",
    tip: "Botão só com ícone NÃO tem texto para leitores de tela lerem. O aria-label é obrigatório, não opcional.",
  },
  {
    id: 6,
    type: "concept",
    tag: "O bug das classes",
    title: "O conflito silencioso do Tailwind",
    items: [
      { icon: "💥", text: 'className="px-4 px-8": as duas valem no CSS, e "quem ganha" depende da ordem no arquivo do Tailwind — não do seu código.' },
      { icon: "🎭", text: "Explode quando o componente tem px-4 fixo e você passa px-8 por fora esperando sobrescrever. E não sobrescreve." },
      { icon: "🧰", text: "clsx: monta a string de classes condicionalmente (liga/desliga com booleanos)." },
      { icon: "🔀", text: "tailwind-merge: resolve o conflito de verdade — o último px- vence, como você espera." },
    ],
  },
  {
    id: 7,
    type: "code",
    tag: "clsx + tailwind-merge",
    title: "O helper cn() que todo projeto tem",
    codeLabel: "lib/utils.ts",
    code: `// npm install clsx tailwind-merge
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// O padrão universal (é o mesmo do Shadcn/UI):
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Uso ──────────────────────────────────────────────
cn("px-4 py-2", "px-8")                      // → "py-2 px-8"  (px-8 vence!)
cn("text-white", isError && "text-red-500")  // condicional
cn("rounded-lg", className)                   // mescla props externas sem conflito`,
    tip: "cn() é o helper mais copiado do ecossistema React. Sempre que um componente aceita className por fora, use cn() para mesclar sem brigas.",
  },
  {
    id: 8,
    type: "demo",
    tag: "Componente com variantes",
    title: "Um <Button> de verdade, ao vivo",
    subtitle: "O mesmo componente, quatro variantes e três tamanhos — clique, veja o loading, e o rounded-full sendo mesclado via cn().",
    demo: "button-variants",
    code: `import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:   "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
  secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
  outline:   "border border-orange-500/60 text-orange-400 hover:bg-orange-500/10",
  ghost:     "bg-transparent text-zinc-300 hover:bg-white/5",
};
const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3 text-base gap-2.5",
};

export function Button({
  variant = "primary", size = "md", className, ...props
}: React.ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold",
        "transition active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant], sizes[size], className,
      )}
      {...props}   /* repassa onClick, disabled, type… */
    />
  );
}`,
    codeLabel: "components/ui/Button.tsx (copie inteiro)",
    tip: "O ...props repassa tudo (onClick, disabled, type) para o <button> real. O componente vira um <button> turbinado, não uma caixa fechada.",
  },
  {
    id: 9,
    type: "quiz",
    tag: "Quiz",
    title: "Resolvendo o conflito",
    question: 'Com o helper cn(), qual o resultado de cn("p-2 bg-blue-500", "p-6")?',
    options: [
      { text: '"p-2 bg-blue-500 p-6" — mantém os dois p-', correct: false, explanation: "Isso é o que clsx sozinho faria. O twMerge dentro do cn() remove o conflito." },
      { text: '"bg-blue-500 p-6" — o p-6 vence o p-2', correct: true, explanation: "Exato! tailwind-merge detecta que p-2 e p-6 controlam a mesma coisa e mantém só o último. bg-blue-500 não conflita, então fica." },
      { text: '"p-2 bg-blue-500" — o primeiro p- sempre vence', correct: false, explanation: "Ao contrário: a intenção do cn() é deixar o ÚLTIMO vencer, permitindo sobrescrever via props." },
      { text: "Erro — não pode ter dois p- na mesma chamada", correct: false, explanation: "Pode sim — é justamente para isso que o cn() existe: receber classes conflitantes e resolver." },
    ],
    xp: 15,
  },
  {
    id: 10,
    type: "concept",
    tag: "Feedback ao usuário",
    title: "Seu componente precisa FALAR",
    subtitle: "Um botão que salva sem avisar nada deixa o usuário no escuro. Existe um espectro de feedback:",
    items: [
      { icon: "🔔", text: "Toast (Sonner): discreto, aparece no canto e some sozinho. Para SUCESSO e avisos que não travam o fluxo." },
      { icon: "🛑", text: "Modal bloqueante (SweetAlert2): trava a tela e exige decisão. Para ações DESTRUTIVAS ('Excluir?')." },
      { icon: "🎉", text: "Celebração (confetti): reservado para conquistas raras. (Você verá na Aula 04.)" },
      { icon: "🎯", text: "Regra: quanto mais grave/irreversível a ação, mais o feedback deve interromper o usuário." },
    ],
  },
  {
    id: 11,
    type: "demo",
    tag: "Feedback · Sonner",
    title: "Toast com Sonner (clique de verdade)",
    subtitle: "A biblioteca de toast mais usada do ecossistema React. Discreto, bonito e com 1 linha por notificação.",
    demo: "sonner-toast",
    code: `// npm install sonner
import { Toaster, toast } from "sonner";

// 1) Monte o <Toaster /> UMA vez (no layout raiz):
<Toaster theme="dark" richColors position="bottom-right" />

// 2) Dispare de qualquer lugar:
toast.success("Aluno cadastrado com sucesso!");
toast.error("Falha ao salvar.");
toast("Arquivo movido", {
  action: { label: "Desfazer", onClick: () => restaurar() },
});`,
    codeLabel: "sonner.tsx",
    tip: "richColors dá as cores automáticas de sucesso/erro. O <Toaster /> vai UMA vez no layout; o toast() você chama onde quiser.",
  },
  {
    id: 12,
    type: "demo",
    tag: "Feedback · SweetAlert2",
    title: "Confirmação bloqueante com SweetAlert2",
    subtitle: "Para ações destrutivas: trava a tela e espera 'Sim' ou 'Cancelar'. Clique em Excluir e escolha.",
    demo: "sweetalert-confirm",
    code: `// npm install sweetalert2
import Swal from "sweetalert2";

const result = await Swal.fire({
  title: "Excluir aluno?",
  text: "Essa ação não pode ser desfeita.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sim, excluir",
  confirmButtonColor: "#dc2626",
  background: "#18181b", color: "#f4f4f5",
});

if (result.isConfirmed) {
  await deletarAluno(id);
  toast.success("Aluno excluído.");  // combinam bem!
}`,
    codeLabel: "sweetalert.tsx",
    tip: "Padrão profissional: SweetAlert CONFIRMA a ação destrutiva → você executa → um toast do Sonner CONFIRMA o resultado. Os dois juntos.",
  },
  {
    id: 13,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o helper",
    instruction: "O famoso helper cn() combina duas bibliotecas. Complete a função que envolve o clsx (digite só o nome da função de merge):",
    prefix: `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return _________(clsx(inputs));
}`,
    answer: "twMerge",
    hint: "É a função importada do tailwind-merge que resolve os conflitos.",
    xp: 20,
  },
  {
    id: 14,
    type: "demo",
    tag: "🔥 Projeto do módulo",
    title: "O projeto até aqui: ganhou vida",
    subtitle: "A mesma Central On Fire, agora com header + ícones Lucide, botões componentizados e o CTA disparando um toast. Clique em 'Começar agora'.",
    demo: "projeto-2",
    tip: "Compare com a Aula 01: o visual é o mesmo, mas agora os botões são o <Button> reutilizável, com ícones e feedback. Isto é evoluir sem reescrever.",
  },
  {
    id: 15,
    type: "mini-challenge",
    tag: "🎯 Missão 10",
    title: "KIT DE\nCOMPONENTES",
    subtitle: "Ícones, um Button reutilizável e feedback — a base do seu Design System",
    tasks: [
      "Instale lucide-react, clsx, tailwind-merge, sonner e sweetalert2",
      "Crie o helper cn() em lib/utils.ts (twMerge(clsx(inputs)))",
      "Crie components/ui/Button.tsx com variantes (primary/secondary/outline/ghost), tamanhos e cn() — teste sobrescrever o padding por fora",
      "Adicione ícones do Lucide nos botões (ex.: LogIn, Trash2) e um estado de loading com <Loader2 className=\"animate-spin\" />",
      "Monte o <Toaster /> no layout e dispare toast.success ao 'salvar' um formulário",
      "Num botão de excluir, use Swal.fire com confirmação antes de deletar — e um toast.success depois",
    ],
    bonus: [
      "Crie um IconButton compondo o Button (não do zero), com aria-label obrigatório",
      "Monte uma página /kit exibindo todas as variantes e tamanhos lado a lado",
    ],
    xp: 50,
    nextHref: "/modulos/ui/shadcn",
    nextLabel: "Aula 03: Headless UI & Shadcn →",
  },
];
