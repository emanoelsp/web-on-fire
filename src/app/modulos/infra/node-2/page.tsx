import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_02_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 · Parte 2 — Como o Node funciona · Web On Fire Academy",
};

export default function NodeParte2Page() {
  return (
    <SlidePresentation
      slides={AULA_02_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 01 · P2 — Como o Node funciona"
      aulaSlug="infra-node-2"
    />
  );
}
