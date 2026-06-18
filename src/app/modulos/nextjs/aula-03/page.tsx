import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA03_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 03 — Server vs Client Components · Web On Fire Academy",
};

export default function Aula03Page() {
  return (
    <SlidePresentation
      slides={AULA03_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 03 — Server vs Client"
    />
  );
}
