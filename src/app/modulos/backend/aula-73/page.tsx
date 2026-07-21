import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA73_SLIDES } from "./slides-data";

export const metadata = {
  title: "5.3 — CRUD Completo · Web On Fire Academy",
};

export default function Aula73Page() {
  return (
    <SlidePresentation
      slides={AULA73_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 05"
      aulaLabel="5.3 — CRUD Completo"
      aulaSlug="backend-aula-83"
      completionHref="/modulos/backend/parte2"
      completionLabel="Atividade Final →"
    />
  );
}
