interface BaseSlide {
  id: number;
  tag: string;
  title: string;
  subtitle?: string;
  tip?: string;
}

export interface CoverSlide extends BaseSlide {
  type: "cover";
}

export interface ConceptSlide extends BaseSlide {
  type: "concept" | "best-practices";
  items: Array<{ icon: string; text: string }>;
}

export interface DefinitionSlide extends BaseSlide {
  type: "definition";
  quote: string;
  highlights?: string[];
}

export interface ComparisonSlide extends BaseSlide {
  type: "comparison";
  left: { label: string; items: string[] };
  right: { label: string; items: string[] };
}

export interface ArchitectureSlide extends BaseSlide {
  type: "architecture";
  steps: Array<{ icon: string; text: string }>;
}

export type DiagramColor = "fire" | "green" | "blue" | "amber" | "neutral";

export interface DiagramSlide extends BaseSlide {
  type: "diagram";
  layers: Array<{
    icon?: string;
    label: string;
    desc?: string;
    color?: DiagramColor;
    connector?: string;
  }>;
  loopBack?: string;
}

export interface CodeSlide extends BaseSlide {
  type: "code" | "files";
  code: string;
  codeLabel?: string;
}

/**
 * Fluxograma horizontal (nós ligados por setas), com opção de fechar o ciclo.
 * Complementa o `diagram` (que é vertical/linear): use `flow` para processos
 * cíclicos (ex.: event loop) ou fluxos que voltam ao início.
 */
export interface FlowSlide extends BaseSlide {
  type: "flow";
  nodes: Array<{
    icon?: string;
    label: string;
    desc?: string;
    color?: DiagramColor;
  }>;
  /** quando true, desenha a seta de retorno do último nó para o primeiro */
  cycle?: boolean;
  /** texto exibido na seta de retorno do ciclo */
  cycleLabel?: string;
}

/**
 * Grafo de commits do Git (SVG): uma branch principal que se ramifica numa
 * feature e depois faz merge de volta. Cada commit é uma bolinha com rótulo.
 */
export interface BranchSlide extends BaseSlide {
  type: "branch";
  mainLabel?: string;        // padrão "main"
  featureLabel?: string;     // padrão "feature"
  mainCommits: string[];     // commits na main antes de ramificar
  featureCommits: string[];  // commits na branch de feature
  mergeLabel?: string;       // o commit de merge na main (padrão "merge")
  tailCommits?: string[];    // commits na main depois do merge
  note?: string;             // legenda curta abaixo do grafo
}

/**
 * Elemento HTML que o palco do live-preview vai renderizar de verdade.
 * As classes de cada passo são aplicadas nele, então hover/active/transition
 * funcionam ao vivo — o aluno passa o mouse no resultado real.
 */
export type PreviewElement = "button" | "link" | "badge" | "input" | "card";

/**
 * Slide "ver acontecer": mostra o MESMO elemento evoluindo em passos.
 * Cada passo aplica classes Tailwind REAIS (strings literais → o compilador
 * do Tailwind as detecta) e destaca o trecho novo. É a espinha dorsal da
 * aula de estilização: estilizar → ver → incrementar → ver.
 */
export interface LivePreviewSlide extends BaseSlide {
  type: "live-preview";
  /** o que renderizar no palco (padrão: "button") */
  element?: PreviewElement;
  /** texto interno do elemento (rótulo do botão, texto do link, placeholder…) */
  content?: string;
  /** legenda curta acima do palco (ex.: "Passe o mouse no botão") */
  stageLabel?: string;
  /** a evolução: cada passo mostra o resultado renderizado + as classes */
  steps: Array<{
    /** rótulo do passo, ex.: "1. Sem estilo" ou "+ cor de fundo" */
    label: string;
    /** classes Tailwind reais aplicadas ao elemento neste passo */
    className: string;
    /** trecho novo introduzido neste passo, destacado no breakdown */
    added?: string;
    /** explicação de uma linha do que a classe nova faz */
    note?: string;
  }>;
}

/**
 * Slide "brinque com": renderiza um componente React interativo REAL,
 * registrado por chave (ícones Lucide, variantes de botão, toast Sonner,
 * confirmação SweetAlert…). Mantém o slide-data serializável — a lógica
 * interativa vive no registry em components/slides/demos.tsx.
 */
export interface DemoSlide extends BaseSlide {
  type: "demo";
  /** chave no DEMO_REGISTRY (ex.: "sonner-toast") */
  demo: string;
  /** código real exibido abaixo do palco (opcional) */
  code?: string;
  codeLabel?: string;
}

export interface MiniChallengeSlide extends BaseSlide {
  type: "mini-challenge";
  tasks: string[];
  bonus?: string[];
  xp?: number;
  nextHref?: string;
  nextLabel?: string;
}

export interface QuizSlide extends BaseSlide {
  type: "quiz";
  question: string;
  options: Array<{
    text: string;
    correct: boolean;
    explanation: string;
  }>;
  xp?: number;
}

export interface FillBlankSlide extends BaseSlide {
  type: "fill-blank";
  instruction: string;
  prefix: string;
  suffix?: string;
  answer: string;
  hint?: string;
  xp?: number;
}

export type Slide =
  | CoverSlide
  | ConceptSlide
  | DefinitionSlide
  | ComparisonSlide
  | ArchitectureSlide
  | DiagramSlide
  | FlowSlide
  | BranchSlide
  | CodeSlide
  | LivePreviewSlide
  | DemoSlide
  | MiniChallengeSlide
  | QuizSlide
  | FillBlankSlide;
