import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA71_SLIDES } from "./slides-data";

export const metadata = {
  title: "5.1 — Firebase Firestore · Web On Fire Academy",
};

export default function Aula71Page() {
  return (
    <SlidePresentation
      slides={AULA71_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 05"
      aulaLabel="Aula 01 — Firebase Firestore"
      aulaSlug="backend-aula-81"
      completionHref="/modulos/backend/atividade-1"
      completionLabel="Roteiro da Atividade →"
    />
  );
}
