import SlidePresentation from "@/components/slides/SlidePresentation";
import { FIRESTORE_ESCRITA_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 03 — Cloud Firestore (Escrita e Mutações) · Web On Fire Academy",
};

export default function FirestoreEscritaPage() {
  return (
    <SlidePresentation
      slides={FIRESTORE_ESCRITA_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Aula 03 — Firestore (Escrita e Mutações)"
      aulaSlug="dados-firestore-escrita"
    />
  );
}
