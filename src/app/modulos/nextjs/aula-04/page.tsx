import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA04_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 04 — Layouts, Loading & Error · Web On Fire Academy",
};

export default function Aula04Page() {
  return (
    <SlidePresentation
      slides={AULA04_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 04 — Layouts & UX"
    />
  );
}
