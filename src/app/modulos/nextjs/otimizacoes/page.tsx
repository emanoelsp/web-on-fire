import SlidePresentation from "@/components/slides/SlidePresentation";
import { OTIMIZACOES_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 07 — Otimizações e Lazy Loading · Web On Fire Academy",
};

export default function OtimizacoesPage() {
  return (
    <SlidePresentation
      slides={OTIMIZACOES_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js Core"
      aulaLabel="Aula 07 — Otimizações e Lazy Loading"
      aulaSlug="nextjs-otimizacoes"
    />
  );
}
