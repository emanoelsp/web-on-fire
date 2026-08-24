import SlidePresentation from "@/components/slides/SlidePresentation";
import { DATA_FETCHING_API_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 03 · P2 — De Mock Data para API Routes · Web On Fire Academy",
};

export default function DataFetchingApiPage() {
  return (
    <SlidePresentation
      slides={DATA_FETCHING_API_SLIDES}
      backHref="/modulos/nextjs"
      backLabel="Next.js Core"
      aulaLabel="Aula 03 · P2 — De Mock Data para API Routes"
      aulaSlug="nextjs-data-fetching-api"
    />
  );
}
