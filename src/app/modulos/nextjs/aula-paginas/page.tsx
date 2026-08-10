import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA_PAGINAS_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 05 P3 — Páginas e URLs · Web On Fire Academy",
};

export default function AulaPaginasPage() {
  return (
    <SlidePresentation
      slides={AULA_PAGINAS_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 05 P3 — Páginas e URLs"
      aulaSlug="nextjs-aula-paginas"
    />
  );
}
