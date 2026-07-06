import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA71_SLIDES } from "./slides-data";

export const metadata = {
  title: "7.1 — Firebase Firestore · Web On Fire Academy",
};

export default function Aula71Page() {
  return (
    <SlidePresentation
      slides={AULA71_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 07"
      aulaLabel="7.1 — Firebase Firestore"
      completionHref="/modulos/backend/atividade-1"
      completionLabel="Roteiro da Atividade →"
    />
  );
}
