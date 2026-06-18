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

export interface CodeSlide extends BaseSlide {
  type: "code" | "files";
  code: string;
  codeLabel?: string;
}

export interface MiniChallengeSlide extends BaseSlide {
  type: "mini-challenge";
  tasks: string[];
  bonus?: string[];
  nextHref?: string;
  nextLabel?: string;
}

export type Slide =
  | CoverSlide
  | ConceptSlide
  | DefinitionSlide
  | ComparisonSlide
  | ArchitectureSlide
  | CodeSlide
  | MiniChallengeSlide;
