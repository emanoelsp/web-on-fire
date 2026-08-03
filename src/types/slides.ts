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
  | CodeSlide
  | MiniChallengeSlide
  | QuizSlide
  | FillBlankSlide;
