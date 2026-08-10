import SlidePresentation from "@/components/slides/SlidePresentation";
import { AUTH_SLIDES } from "./slides-data";

export const metadata = {
  title: "Aula 01 — Identidade e Segurança (Firebase Auth) · Web On Fire Academy",
};

export default function AuthPage() {
  return (
    <SlidePresentation
      slides={AUTH_SLIDES}
      backHref="/modulos/dados"
      backLabel="Persistência & BaaS"
      aulaLabel="Aula 01 — Identidade e Segurança"
      aulaSlug="dados-auth"
    />
  );
}
