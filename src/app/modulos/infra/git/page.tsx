import SlidePresentation from "@/components/slides/SlidePresentation";
import { GIT_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 03 — Controle de Versão (Git & GitHub) · Web On Fire Academy",
};

export default function GitPage() {
  return (
    <SlidePresentation
      slides={GIT_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 03 — Git & GitHub"
      aulaSlug="infra-git"
    />
  );
}
