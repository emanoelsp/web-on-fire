import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_TERMINAL_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 04 — Terminal: CMD & Bash · Web On Fire Academy",
};

export default function TerminalPage() {
  return (
    <SlidePresentation
      slides={AULA_TERMINAL_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 04 — Terminal: CMD & Bash"
      aulaSlug="infra-terminal"
    />
  );
}
