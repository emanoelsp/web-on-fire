import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_03_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 · Parte 3 — Node no mundo real · Web On Fire Academy",
};

export default function NodeParte3Page() {
  return (
    <SlidePresentation
      slides={AULA_03_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 01 · P3 — Node no mundo real"
      aulaSlug="infra-node-3"
    />
  );
}
