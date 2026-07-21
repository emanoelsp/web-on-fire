import SlidePresentation from "@/components/slides/SlidePresentation";
import { DASHBOARDS_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 13 — Visualização de Dados para Dashboards · Web On Fire Academy",
};

export default function DashboardsPage() {
  return (
    <SlidePresentation
      slides={DASHBOARDS_SLIDES}
      backHref="/modulos/ui"
      backLabel="Estilização & UI"
      aulaLabel="Aula 13 — Visualização de Dados"
      aulaSlug="ui-dashboards"
    />
  );
}
