import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA73_SLIDES } from "./slides-data";

export const metadata = {
  title: "7.3 — CRUD Completo · Web On Fire Academy",
};

export default function Aula73Page() {
  return (
    <SlidePresentation
      slides={AULA73_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 07"
      aulaLabel="7.3 — CRUD Completo"
      completionHref="/modulos/backend/parte2"
      completionLabel="Atividade Final →"
    />
  );
}
