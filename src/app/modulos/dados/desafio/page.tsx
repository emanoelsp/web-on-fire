import ModuleChallenge, { type ChallengeSection } from "@/components/ModuleChallenge";

export const metadata = {
  title: "Desafio Final — Nexus dos Heróis · Web On Fire Academy",
};

const sections: ChallengeSection[] = [
  {
    section: "Configuração Inicial",
    icon: "⚙️",
    tasks: [
      { id: "s0a", text: "Fork do repositório nexus-heroes feito no GitHub" },
      { id: "s0b", text: "Projeto clonado, npm install executado com sucesso" },
      { id: "s0c", text: "Firebase configurado: Auth (e-mail/senha) + Firestore ativados" },
      { id: "s0d", text: ".env.local preenchido com as credenciais do seu projeto Firebase" },
      { id: "s0e", text: "npm run dev rodando — banners de bug visíveis na tela" },
    ],
  },
  {
    section: "Bug 01 — Login Silencia Erros",
    icon: "🔴",
    tasks: [
      { id: "s1a", text: "Reproduziu o bug: tentou logar com senha errada e nada aconteceu" },
      { id: "s1b", text: "Encontrou o bloco catch{} vazio em (auth)/login/page.tsx" },
      { id: "s1c", text: "Corrigiu: adicionou setErro() no catch e exibe a mensagem na tela" },
      { id: "s1d", text: "Commit: fix(bug01): exibir mensagem de erro no login" },
    ],
  },
  {
    section: "Bug 02 — Middleware Invertido",
    icon: "🔴",
    tasks: [
      { id: "s2a", text: "Reproduziu o bug: acessou /dashboard sem estar logado (ou foi bloqueado estando logado)" },
      { id: "s2b", text: "Encontrou a condição if (token) invertida em middleware.ts" },
      { id: "s2c", text: "Corrigiu: trocou if (token) por if (!token)" },
      { id: "s2d", text: "Commit: fix(bug02): corrigir condição do middleware de proteção de rotas" },
    ],
  },
  {
    section: "Bug 03 — Confirmação de Senha Quebrada",
    icon: "🔴",
    tasks: [
      { id: "s3a", text: "Reproduziu o bug: criou conta com senhas diferentes e funcionou" },
      { id: "s3b", text: "Encontrou if (senha !== nome) errado em (auth)/cadastro/page.tsx" },
      { id: "s3c", text: "Corrigiu: trocou nome por confirmarSenha na comparação" },
      { id: "s3d", text: "Commit: fix(bug03): corrigir validação de confirmação de senha" },
    ],
  },
  {
    section: "Bug 04 — Personagens de Todos os Usuários",
    icon: "🔴",
    tasks: [
      { id: "s4a", text: "Reproduziu o bug: personagens de outros usuários aparecem no dashboard" },
      { id: "s4b", text: "Encontrou a query sem where() em services/personagens.ts" },
      { id: "s4c", text: "Corrigiu: adicionou where('userId', '==', uid) à query" },
      { id: "s4d", text: "Commit: fix(bug04): filtrar personagens pelo userId do usuário logado" },
    ],
  },
  {
    section: "Bug 05 — Personagem Criado Não Aparece",
    icon: "🔴",
    tasks: [
      { id: "s5a", text: "Reproduziu o bug: criou um personagem e ele sumiu do dashboard" },
      { id: "s5b", text: "Encontrou addDoc(..., 'personagem') com nome errado em services/personagens.ts" },
      { id: "s5c", text: "Corrigiu: trocou 'personagem' por 'personagens' (com 's') no addDoc" },
      { id: "s5d", text: "Commit: fix(bug05): corrigir nome da coleção no addDoc de personagens" },
    ],
  },
  {
    section: "Bug 06 — Equipar Apaga os Outros Items",
    icon: "🔴",
    tasks: [
      { id: "s6a", text: "Reproduziu o bug: equipou uma arma e a armadura desapareceu" },
      { id: "s6b", text: "Encontrou setDoc (que substitui o documento) em services/personagens.ts" },
      { id: "s6c", text: "Corrigiu: trocou setDoc por updateDoc na função equiparItem" },
      { id: "s6d", text: "Commit: fix(bug06): usar updateDoc em vez de setDoc para não apagar campos" },
    ],
  },
  {
    section: "Bug 07 — Deletar Personagem Errado",
    icon: "🔴",
    tasks: [
      { id: "s7a", text: "Reproduziu o bug: tentou deletar um personagem e o errado foi deletado" },
      { id: "s7b", text: "Encontrou String(indice) sendo usado como ID do documento em services/personagens.ts" },
      { id: "s7c", text: "Corrigiu: trocou String(indice) por personagem.id no deleteDoc" },
      { id: "s7d", text: "Commit: fix(bug07): usar personagem.id em vez do índice no deleteDoc" },
    ],
  },
  {
    section: "Bug 08 — Security Rules Abertas",
    icon: "🔴",
    tasks: [
      { id: "s8a", text: "Entendeu o problema: rules com 'if true' permitem acesso total sem autenticação" },
      { id: "s8b", text: "Escreveu rules que verificam request.auth != null" },
      { id: "s8c", text: "Adicionou verificação request.auth.uid == resource.data.userId para leitura/escrita" },
      { id: "s8d", text: "Commit: fix(bug08): implementar Security Rules que protegem por userId" },
    ],
  },
  {
    section: "Relatório e Entrega",
    icon: "📋",
    tasks: [
      { id: "s9a", text: "RELATORIO.md criado com explicação de cada bug (antes/depois do código)" },
      { id: "s9b", text: "Prints ou screenshots mostrando o bug ativo e o bug corrigido" },
      { id: "s9c", text: "App deployado na Vercel com as variáveis de ambiente configuradas" },
      { id: "s9d", text: "Link do deploy enviado — app funcionando 100% em produção" },
    ],
  },
];

const bonus = [
  { id: "b1", text: "Adicione validação de força de senha no cadastro (mínimo: letra maiúscula + número)" },
  { id: "b2", text: "Implemente onSnapshot para atualização em tempo real dos personagens no dashboard" },
  { id: "b3", text: "Adicione increment() atômico de XP cada vez que um item é equipado" },
  { id: "b4", text: "Crie uma página de perfil com updateProfile para editar nome e foto" },
  { id: "b5", text: "Adicione logout em todas as páginas protegidas com confirmação" },
  { id: "b6", text: "Implemente onAuthStateChanged para redirecionar automaticamente após login" },
];

const criteria = [
  "Todos os 8 bugs corrigidos e funcionando em produção",
  "8 commits separados com mensagens claras (fix(bugXX): ...)",
  "RELATORIO.md com explicação técnica de cada bug",
  "Screenshots mostrando o antes (bug) e depois (corrigido)",
  "Security Rules protegendo dados por userId (não 'if true')",
  "App na Vercel com variáveis de ambiente configuradas",
  "TypeScript sem erros (npm run build passando)",
];

const quickstart = [
  {
    label: "Fork — crie sua cópia no GitHub",
    code: `1. Acesse: https://github.com/emanoelsp/desafiobaas
2. Clique no botão "Fork" (canto superior direito, ao lado da ⭐)
3. Clique em "Create fork" — sem alterar nada`,
    note: "Isso cria uma cópia do projeto na SUA conta do GitHub.",
  },
  {
    label: "Clone — baixe o código para o seu computador",
    code: `git clone https://github.com/SEU-USUARIO/desafiobaas.git
cd desafiobaas`,
    note: "Troque SEU-USUARIO pelo seu nome de usuário do GitHub.",
  },
  {
    label: "Instale as dependências",
    code: `npm install`,
    note: "Aguarde terminar. A pasta node_modules vai aparecer — isso é normal.",
  },
  {
    label: "Crie o arquivo .env.local com as credenciais do Firebase",
    code: `# 1. Acesse https://console.firebase.google.com e crie um projeto
# 2. Ative Authentication → E-mail/Senha
# 3. Ative Firestore Database → modo de teste
# 4. Vá em Configurações do projeto → clique em </> → registre um app web
# 5. Copie os valores do firebaseConfig e cole aqui:

cp .env.example .env.local`,
    note: "Abra o .env.local no VS Code e substitua cada valor pelo que aparece no firebaseConfig do seu projeto Firebase.",
  },
  {
    label: "Cole as credenciais no .env.local (exemplo)",
    code: `NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=000000000000
NEXT_PUBLIC_FIREBASE_APP_ID=1:000000000000:web:abc123`,
    note: "⚠️ Nunca suba o .env.local para o GitHub — ele já está no .gitignore.",
  },
  {
    label: "Rode o projeto localmente",
    code: `npm run dev`,
    note: "Acesse http://localhost:3000 no navegador. Os banners vermelhos de bug já vão aparecer em cada página.",
  },
  {
    label: "A cada bug corrigido — faça um commit",
    code: `git add nome-do-arquivo-editado
git commit -m "fix(bug01): exibir mensagem de erro no login"
git push origin main`,
    note: 'Troque "bug01" e a descrição pelo número e título do bug que você corrigiu. Um commit por bug.',
  },
];

export default function DesafioNexusPage() {
  return (
    <ModuleChallenge
      aulaSlug="dados-desafio"
      moduleLabel="Módulo 04"
      moduleHref="/modulos/dados"
      moduleName="Persistência & BaaS"
      title={"NEXUS DOS\nHERÓIS"}
      subtitle="Caça de bugs em um jogo real — cada erro corrigido é um commit. Firebase Auth, Firestore e Security Rules com bugs reais para resolver."
      intro="O projeto base é um jogo de criação de personagens com 8 bugs plantados no código. Faça o fork, reproduza cada problema, corrija, comite e documente. No final: app no ar, sem bugs, com relatório técnico — software entregue de verdade."
      sections={sections}
      bonus={bonus}
      criteria={criteria}
      xp={150}
      repoUrl="https://github.com/emanoelsp/desafiobaas"
      quickstart={quickstart}
    />
  );
}
