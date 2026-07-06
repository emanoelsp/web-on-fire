import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA72_SLIDES } from "./slides-data";

export const metadata = {
  title: "7.2 — Cadastro em Camadas · Web On Fire Academy",
};

export default function Aula72Page() {
  return (
    <SlidePresentation
      slides={AULA72_SLIDES}
      backHref="/modulos/backend"
      backLabel="Módulo 07"
      aulaLabel="7.2 — Cadastro em Camadas"
      completionHref="/modulos/backend/atividade-2"
      completionLabel="Roteiro da Atividade →"
    />
  );
}
