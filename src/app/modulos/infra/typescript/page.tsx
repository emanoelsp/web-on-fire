import SlidePresentation from "@/components/slides/SlidePresentation";
import { TYPESCRIPT_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 02 — Tipagem Estática para Web · Web On Fire Academy",
};

export default function TypeScriptPage() {
  return (
    <SlidePresentation
      slides={TYPESCRIPT_SLIDES}
      backHref="/modulos/infra"
      backLabel="Infraestrutura"
      aulaLabel="Aula 02 — Tipagem Estática (TypeScript)"
      aulaSlug="infra-typescript"
    />
  );
}
