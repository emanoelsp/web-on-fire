import SlidePresentation from "@/components/slides/SlidePresentation";
import { DATA_FETCHING_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 06 — Data Fetching e Mock Data · Web On Fire Academy",
};

export default function DataFetchingPage() {
  return (
    <SlidePresentation
      slides={DATA_FETCHING_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js Core"
      aulaLabel="Aula 06 — Data Fetching e Mock Data"
      aulaSlug="nextjs-data-fetching"
    />
  );
}
