import SlidePresentation from "@/components/slides/SlidePresentation";
import { TAILWIND_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 — Tailwind CSS e Design Responsivo · Web On Fire Academy",
};

export default function TailwindPage() {
  return (
    <SlidePresentation
      slides={TAILWIND_SLIDES}
      backHref="/modulos/ui"
      backLabel="Estilização & UI"
      aulaLabel="Aula 01 — Tailwind CSS e Responsivo"
      aulaSlug="ui-tailwind"
    />
  );
}
