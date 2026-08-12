import SlidePresentation from "@/components/slides/SlidePresentation";
import { PROJETO_BASE_SLIDES } from "./slides-data";

export const metadata = {
  title: "Projeto Base — Firebase Auth Completo · Web On Fire Academy",
};

export default function ProjetoBasePage() {
  return (
    <SlidePresentation
      slides={PROJETO_BASE_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Projeto Base — Firebase Auth Completo"
      aulaSlug="dados-projeto-base"
    />
  );
}
