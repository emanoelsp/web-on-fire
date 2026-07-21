import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_01_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 · Parte 1 — O que é Node.js · Web On Fire Academy",
};

export default function NodeParte1Page() {
  return (
    <SlidePresentation
      slides={AULA_01_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 01 · P1 — O que é Node.js"
      aulaSlug="infra-node-1"
    />
  );
}
