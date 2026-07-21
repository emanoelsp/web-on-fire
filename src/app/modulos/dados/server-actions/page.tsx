import SlidePresentation from "@/components/slides/SlidePresentation";
import { SERVER_ACTIONS_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 17 — Mutações Modernas com Server Actions · Web On Fire Academy",
};

export default function ServerActionsPage() {
  return (
    <SlidePresentation
      slides={SERVER_ACTIONS_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Aula 17 — Server Actions"
      aulaSlug="dados-server-actions"
    />
  );
}
