import SlidePresentation from "@/components/slides/SlidePresentation";
import { FORMS_AULA01_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 — Projeto Base & Estrutura · Web On Fire Academy",
};

export default function FormsAula01Page() {
  return (
    <SlidePresentation
      slides={FORMS_AULA01_SLIDES}
      backHref="/modulos/forms"
      backLabel="Formulários & UX"
      aulaLabel="Aula 01 — Projeto Base & Estrutura"
      aulaSlug="forms-aula-01"
    />
  );
}
