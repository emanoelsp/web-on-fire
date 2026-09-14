import SlidePresentation from "@/components/slides/SlidePresentation";
import { FORMS_AULA04_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 04 — Validação com Zod · Web On Fire Academy",
};

export default function FormsAula04Page() {
  return (
    <SlidePresentation
      slides={FORMS_AULA04_SLIDES}
      backHref="/modulos/forms"
      backLabel="Formulários & UX"
      aulaLabel="Aula 04 — Validação com Zod"
      aulaSlug="forms-aula-04"
    />
  );
}
