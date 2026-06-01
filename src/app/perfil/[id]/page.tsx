import { buscarUsuario } from "@/services/userService";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PerfilPage({ params }: Props) {
  const { id } = await params;
  const usuario = await buscarUsuario(id);

  if (!usuario) {
    notFound();
  }

  const iniciais = usuario.nome
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
    <Navbar />
    <main style={{ minHeight: "100vh", background: "var(--dark-1)", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* BACK */}
        <Link
          href="/modulos/backend/atividade-2"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            fontSize: "0.85rem",
            marginBottom: "2rem",
          }}
        >
          ← Novo cadastro
        </Link>

        {/* SUCCESS BANNER */}
        <div
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: "12px",
            padding: "1rem 1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>✅</span>
          <div>
            <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.9rem" }}>
              Cadastro realizado com sucesso!
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Documento salvo no Firestore com ID:{" "}
              <code style={{ fontFamily: "var(--font-mono)", color: "#aaa" }}>{id}</code>
            </p>
          </div>
        </div>

        {/* CARD DO PERFIL */}
        <div
          className="fire-border"
          style={{
            borderRadius: "20px",
            background: "var(--dark-2)",
            overflow: "hidden",
          }}
        >
          {/* Header do card */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(255,85,0,0.15), rgba(204,34,0,0.05))",
              padding: "2.5rem 2rem 2rem",
              textAlign: "center",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FF5500, #CC2200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                letterSpacing: "0.05em",
                color: "#fff",
                boxShadow: "0 0 30px rgba(255,85,0,0.4)",
              }}
            >
              {iniciais}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
                marginBottom: "0.35rem",
              }}
            >
              {usuario.nome}
            </h1>

            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {usuario.email}
            </p>
          </div>

          {/* Dados */}
          <div style={{ padding: "2rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.25rem",
                textTransform: "uppercase",
              }}
            >
              Informações Cadastradas
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Nome", value: usuario.nome, icon: "👤" },
                { label: "E-mail", value: usuario.email, icon: "📧" },
                { label: "Telefone", value: usuario.telefone, icon: "📱" },
              ].map((field) => (
                <div
                  key={field.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.9rem 1rem",
                    borderRadius: "10px",
                    background: "var(--dark-3)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{field.icon}</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {field.label}
                    </p>
                    <p style={{ color: "var(--text-primary)", fontSize: "0.9rem" }}>
                      {field.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ID do documento */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.9rem 1rem",
                borderRadius: "10px",
                background: "rgba(255,85,0,0.05)",
                border: "1px solid rgba(255,85,0,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.35rem",
                }}
              >
                🔑 ID no Firestore (coleção &quot;usuarios&quot;)
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  color: "#FF7744",
                  wordBreak: "break-all",
                }}
              >
                {id}
              </p>
            </div>
          </div>
        </div>

        {/* EXPLICAÇÃO DIDÁTICA */}
        <div
          style={{
            background: "var(--dark-2)",
            borderRadius: "16px",
            padding: "1.75rem",
            marginTop: "1.5rem",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              letterSpacing: "0.04em",
              marginBottom: "1rem",
            }}
          >
            🧠 O QUE ACONTECEU?
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                n: "1",
                text: "O formulário chamou cadastrarUsuario() do userService.ts",
              },
              {
                n: "2",
                text: "O service usou addDoc() para gravar na coleção usuarios do Firestore",
              },
              {
                n: "3",
                text: "O Firestore gerou um ID único automaticamente e retornou",
              },
              {
                n: "4",
                text: "O Next.js fez router.push('/perfil/' + id) para redirecionar aqui",
              },
              {
                n: "5",
                text: "Esta página usou buscarUsuario(id) para ler os dados do Firestore",
              },
            ].map((item) => (
              <div
                key={item.n}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                <span className="step-dot" style={{ width: "1.6rem", height: "1.6rem", fontSize: "0.68rem", flexShrink: 0, marginTop: "0.1rem" }}>
                  {item.n}
                </span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* NAV */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            href="/modulos/backend/atividade-2"
            style={{
              flex: 1,
              minWidth: "180px",
              padding: "0.9rem",
              textAlign: "center",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "var(--text-muted)",
              textDecoration: "none",
              fontSize: "0.87rem",
              fontWeight: 600,
            }}
          >
            ← Novo Cadastro
          </Link>
          <Link
            href="/"
            className="fire-btn"
            style={{
              flex: 1,
              minWidth: "180px",
              padding: "0.9rem",
              textAlign: "center",
              borderRadius: "12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.87rem",
              fontWeight: 700,
            }}
          >
            🔥 Home
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
