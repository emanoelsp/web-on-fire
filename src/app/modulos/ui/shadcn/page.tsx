import SlidePresentation from "@/components/slides/SlidePresentation";
import { SHADCN_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 11 — Headless UI e Shadcn/UI · Web On Fire Academy",
};

export default function ShadcnPage() {
  return (
    <SlidePresentation
      slides={SHADCN_SLIDES}
      backHref="/modulos/ui"
      backLabel="Estilização & UI"
      aulaLabel="Aula 11 — Headless UI e Shadcn/UI"
      aulaSlug="ui-shadcn"
    />
  );
}
