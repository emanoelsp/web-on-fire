import SlidePresentation from "@/components/slides/SlidePresentation";
import { INTRO_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 02 — Introdução ao Next.js · Web On Fire Academy",
};

export default function IntroPage() {
  return (
    <SlidePresentation
      slides={INTRO_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js"
      aulaLabel="Aula 02 · P1 — Fundações do Next.js"
      aulaSlug="nextjs-intro"
    />
  );
}
