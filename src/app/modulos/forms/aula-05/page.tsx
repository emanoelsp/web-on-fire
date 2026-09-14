import SlidePresentation from "@/components/slides/SlidePresentation";
import { FORMS_AULA05_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 05 — Máscaras de Input · Web On Fire Academy",
};

export default function FormsAula05Page() {
  return (
    <SlidePresentation
      slides={FORMS_AULA05_SLIDES}
      backHref="/modulos/forms"
      backLabel="Formulários & UX"
      aulaLabel="Aula 05 — Máscaras de Input"
      aulaSlug="forms-aula-05"
    />
  );
}
