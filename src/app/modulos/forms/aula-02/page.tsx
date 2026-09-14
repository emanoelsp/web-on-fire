import SlidePresentation from "@/components/slides/SlidePresentation";
import { FORMS_AULA02_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 02 — Loading, Error & Not Found · Web On Fire Academy",
};

export default function FormsAula02Page() {
  return (
    <SlidePresentation
      slides={FORMS_AULA02_SLIDES}
      backHref="/modulos/forms"
      backLabel="Formulários & UX"
      aulaLabel="Aula 02 — Loading, Error & Not Found"
      aulaSlug="forms-aula-02"
    />
  );
}
