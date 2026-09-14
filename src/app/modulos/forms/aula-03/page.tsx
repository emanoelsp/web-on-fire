import SlidePresentation from "@/components/slides/SlidePresentation";
import { FORMS_AULA03_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 03 — Otimizações & Lazy Loading · Web On Fire Academy",
};

export default function FormsAula03Page() {
  return (
    <SlidePresentation
      slides={FORMS_AULA03_SLIDES}
      backHref="/modulos/forms"
      backLabel="Formulários & UX"
      aulaLabel="Aula 03 — Otimizações & Lazy Loading"
      aulaSlug="forms-aula-03"
    />
  );
}
