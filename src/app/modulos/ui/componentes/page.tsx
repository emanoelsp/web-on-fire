import SlidePresentation from "@/components/slides/SlidePresentation";
import { COMPONENTES_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 02 — Ícones, Componentes & Feedback · Web On Fire Academy",
};

export default function ComponentesPage() {
  return (
    <SlidePresentation
      slides={COMPONENTES_SLIDES}
      backHref="/modulos/ui"
      backLabel="Estilização & UI"
      aulaLabel="Aula 02 — Ícones, Componentes & Feedback"
      aulaSlug="ui-componentes"
    />
  );
}
