import SlidePresentation from "@/components/slides/SlidePresentation";
import { FIRESTORE_LEITURA_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 15 — Cloud Firestore (Leitura e Modelagem) · Web On Fire Academy",
};

export default function FirestoreLeituraPage() {
  return (
    <SlidePresentation
      slides={FIRESTORE_LEITURA_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Aula 15 — Firestore (Leitura e Modelagem)"
      aulaSlug="dados-firestore-leitura"
    />
  );
}
