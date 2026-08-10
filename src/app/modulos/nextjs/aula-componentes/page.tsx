import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_COMPONENTES_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 P2 — Componentes Reutilizáveis · Web On Fire Academy",
};

export default function AulaComponentesPage() {
  return (
    <SlidePresentation
      slides={AULA_COMPONENTES_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 01 P2 — Componentes Reutilizáveis"
      aulaSlug="nextjs-aula-componentes"
    />
  );
}
