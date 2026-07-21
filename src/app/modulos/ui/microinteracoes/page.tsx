import SlidePresentation from "@/components/slides/SlidePresentation";
import { MICROINTERACOES_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 12 — Micro-interações e Feedback · Web On Fire Academy",
};

export default function MicrointeracoesPage() {
  return (
    <SlidePresentation
      slides={MICROINTERACOES_SLIDES}
      backHref="/modulos/ui"
      backLabel="Estilização & UI"
      aulaLabel="Aula 12 — Micro-interações e Feedback"
      aulaSlug="ui-microinteracoes"
    />
  );
}
