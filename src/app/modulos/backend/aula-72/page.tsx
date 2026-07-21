import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA72_SLIDES } from "./slides-data";

export const metadata = {
  title: "5.2 — Cadastro em Camadas · Web On Fire Academy",
};

export default function Aula72Page() {
  return (
    <SlidePresentation
      slides={AULA72_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 05"
      aulaLabel="5.2 — Cadastro em Camadas"
      aulaSlug="backend-aula-82"
      completionHref="/modulos/backend/atividade-2"
      completionLabel="Roteiro da Atividade →"
    />
  );
}
