/** Validação dos itens s1–s4 — hero só com Tailwind (sem Button ainda). */
export function HeroRaw() {
  return (
    <section className="rounded-2xl border border-white/10 bg-zinc-900/60 px-6 py-14 text-center">
      <span className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
        🔥 Painel On Fire
      </span>
      <h1 className="mt-4 bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
        Central On Fire
      </h1>
      <p className="mt-4 text-zinc-400">
        Do primeiro botão ao painel completo — estilização, componentes e dados numa página só.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button className="rounded-lg bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:-translate-y-0.5 hover:brightness-110 active:scale-95">
          Começar agora
        </button>
        <button className="rounded-lg border-2 border-orange-500/60 px-6 py-3 font-semibold text-orange-400 transition hover:bg-orange-500/10">
          Ver trilha
        </button>
      </div>
    </section>
  );
}
