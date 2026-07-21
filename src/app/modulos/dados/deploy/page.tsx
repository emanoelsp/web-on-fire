import SlidePresentation from "@/components/slides/SlidePresentation";
import { DEPLOY_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 18 — Deploy e Entrega na Vercel · Web On Fire Academy",
};

export default function DeployPage() {
  return (
    <SlidePresentation
      slides={DEPLOY_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Aula 18 — Deploy e Entrega"
      aulaSlug="dados-deploy"
    />
  );
}
