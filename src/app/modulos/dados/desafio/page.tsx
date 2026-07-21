import ModuleChallenge, { type ChallengeSection } from "@/components/ModuleChallenge";

export const metadata = {
  title: "Desafio Final — Persistência & BaaS · Web On Fire Academy",
};

const sections: ChallengeSection[] = [
  {
    section: "Identidade e Segurança",
    icon: "🔐",
    tasks: [
      { id: "s1", text: "Firebase Auth ativo: login com e-mail/senha e com Google" },
      { id: "s2", text: "AuthContext com onAuthStateChanged expondo { user, loading }" },
      { id: "s3", text: "Rotas privadas protegidas (redirect no cliente + middleware)" },
      { id: "s4", text: "Papéis: distinção entre usuário comum e admin" },
    ],
  },
  {
    section: "Firestore — Modelagem e Leitura",
    icon: "🗄️",
    tasks: [
      { id: "s5", text: "Modelar ao menos 2 coleções pensando em como serão lidas" },
      { id: "s6", text: "Camada de serviço lendo dados (getDoc/getDocs) do Firestore" },
      { id: "s7", text: "Listagem em Server Component + detalhe por [id] com notFound()" },
      { id: "s8", text: "Ao menos uma query com where/orderBy/limit" },
    ],
  },
  {
    section: "Firestore — Escrita e Mutações",
    icon: "✍️",
    tasks: [
      { id: "s9", text: "CRUD completo: create, update e delete funcionando" },
      { id: "s10", text: "Uso de increment() para um contador atômico (ex: estoque, curtidas)" },
      { id: "s11", text: "Security Rules escritas (não deixar em modo de teste aberto)" },
    ],
  },
  {
    section: "Server Actions e Entrega",
    icon: "🚀",
    tasks: [
      { id: "s12", text: "Ao menos uma mutação feita via Server Action (\"use server\")" },
      { id: "s13", text: "Validação no servidor + revalidatePath após gravar" },
      { id: "s14", text: "Feedback ao usuário: toast de sucesso/erro nas mutações" },
      { id: "s15", text: "Deploy na Vercel com as variáveis de ambiente configuradas — app no ar" },
    ],
  },
];

const bonus = [
  { id: "b1", text: "Sincronização em tempo real com onSnapshot em alguma tela" },
  { id: "b2", text: "Validação com Zod dentro das Server Actions" },
  { id: "b3", text: "useFormStatus para estado de 'Salvando...' nos formulários" },
  { id: "b4", text: "Domínio próprio ou Vercel Analytics ativado" },
];

const criteria = [
  "Login e logout funcionam em produção (na URL da Vercel)",
  "Rotas privadas bloqueiam usuários não autenticados",
  "O CRUD persiste de verdade no Firestore (recarregou, continua lá)",
  "As Security Rules impedem acesso indevido aos dados",
  "Ao menos uma mutação usa Server Action com validação no servidor",
  "O app está publicado e acessível por uma URL pública",
  "TypeScript sem erros e npm run build passando",
];

export default function DesafioDadosPage() {
  return (
    <ModuleChallenge
      aulaSlug="dados-desafio"
      moduleLabel="Módulo 04"
      moduleHref="/modulos/dados"
      moduleName="Persistência & BaaS"
      title={"SOFTWARE\nENTREGUE"}
      subtitle="Junte identidade, banco de dados, mutações modernas e deploy num software completo — no ar, funcionando, pronto para o portfólio."
      intro="Este é o desafio que fecha a jornada: um app full-stack com Firebase Auth, Firestore (leitura e escrita), Server Actions e deploy na Vercel. Ao completar todos os itens, o módulo é registrado no seu progresso — e você tem um produto real para mostrar."
      sections={sections}
      bonus={bonus}
      criteria={criteria}
      xp={150}
    />
  );
}
