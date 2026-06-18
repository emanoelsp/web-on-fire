import SlidePresentation from "@/components/slides/SlidePresentation";
import { AULA02_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 02 — App Router & Roteamento · Web On Fire Academy",
};

export default function Aula02Page() {
  return (
    <SlidePresentation
      slides={AULA02_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 02 — Roteamento"
    />
  );
}
