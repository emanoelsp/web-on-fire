import ModuleChallenge, { type ChallengeSection } from "@/components/ModuleChallenge";

export const metadata = {
  title: "Desafio Final — FormFire Completo · Web On Fire Academy",
};

const sections: ChallengeSection[] = [
  {
    section: "Estrutura do Projeto",
    icon: "🏗️",
    tasks: [
      { id: "s1", text: "Projeto criado com create-next-app (TypeScript + App Router + src/)" },
      { id: "s2", text: "Interface Student tipada em src/types/student.ts (id, nome, email, cpf, telefone, avatarUrl?)" },
      { id: "s3", text: "Mock data com ao menos 3 alunos em src/data/students.ts" },
      { id: "s4", text: "Rota /alunos com lista de alunos usando <Link> para o detalhe de cada um" },
      { id: "s5", text: "Rota dinâmica /alunos/[id] exibindo os dados do aluno pelo ID" },
      { id: "s6", text: "Rota /alunos/cadastro com formulário completo" },
    ],
  },
  {
    section: "UX Estrutural",
    icon: "⏳",
    tasks: [
      { id: "u1", text: "loading.tsx em /alunos com skeleton de cards (retângulos animados)" },
      { id: "u2", text: "error.tsx em /alunos com 'use client', mensagem de erro e botão 'Tentar novamente'" },
      { id: "u3", text: "not-found.tsx em /alunos com mensagem contextual e link de volta" },
      { id: "u4", text: "notFound() chamado em /alunos/[id] quando o aluno não existe" },
    ],
  },
  {
    section: "Otimizações",
    icon: "🚀",
    tasks: [
      { id: "o1", text: "Todos os avatares usam <Image> do next/image (nenhuma <img> crua)" },
      { id: "o2", text: "remotePatterns configurado em next.config.ts para o CDN de imagens" },
      { id: "o3", text: "Duas fontes configuradas com next/font/google no layout.tsx" },
      { id: "o4", text: "Componente pesado (ModalEdicao ou similar) carregado com next/dynamic + ssr: false" },
    ],
  },
  {
    section: "Validação com Zod",
    icon: "🛡️",
    tasks: [
      { id: "v1", text: "Schema studentSchema em src/schemas/student.schema.ts com z.object()" },
      { id: "v2", text: "Tipo StudentFormData gerado com z.infer<typeof studentSchema>" },
      { id: "v3", text: "useForm configurado com resolver: zodResolver(studentSchema)" },
      { id: "v4", text: "Mensagem de erro exibida abaixo de cada campo inválido" },
      { id: "v5", text: "Botão de submit desabilitado durante o envio (isSubmitting)" },
    ],
  },
  {
    section: "Máscaras de Input",
    icon: "🎭",
    tasks: [
      { id: "m1", text: "Campo CPF com máscara 000.000.000-00 via IMaskInput" },
      { id: "m2", text: "Campo telefone com máscara dinâmica (fixo 8 dígitos + celular 9 dígitos)" },
      { id: "m3", text: "Máscaras integradas ao react-hook-form (via Controller ou setValue + onAccept)" },
      { id: "m4", text: "Regex do schema Zod compatível com o formato de saída do IMask" },
    ],
  },
];

const bonus = [
  { id: "b1", text: "Componente MaskedField.tsx reutilizável usado nos campos CPF e telefone" },
  { id: "b2", text: "Campo CEP com máscara (00000-000) que busca o endereço via ViaCEP ao completar" },
  { id: "b3", text: "Validação mode: 'onChange' — feedback ao digitar, não só ao submeter" },
  { id: "b4", text: "Avatar com priority={true} no primeiro aluno e placeholder='blur' numa imagem local" },
];

const criteria = [
  "Todas as <img> substituídas por <Image> do next/image com width e height explícitos",
  "loading.tsx, error.tsx e not-found.tsx presentes e funcionando na rota /alunos",
  "Formulário não submete com campos inválidos — Zod bloqueia e exibe mensagens claras",
  "CPF e telefone aceitam apenas o formato correto com a máscara visual aplicada",
  "Schema Zod e saída do IMask são compatíveis (o regex valida o formato com pontuação da máscara)",
  "Código TypeScript sem erros (npm run build sem warnings de tipo)",
];

export default function FormsDesafioPage() {
  return (
    <ModuleChallenge
      aulaSlug="forms-desafio"
      moduleLabel="Módulo 2.1"
      moduleHref="/modulos/forms"
      moduleName="Formulários & UX Profissional"
      title="FORMFIRE\nCOMPLETO"
      subtitle="Sistema de cadastro de alunos com todas as camadas da produção."
      intro="Você construiu o FormFire aula a aula — agora é hora de unir tudo. Cada seção do checklist corresponde a uma aula: estrutura, UX estrutural, otimizações, validação com Zod e máscaras de input. O desafio está concluído quando todos os itens obrigatórios estiverem marcados."
      sections={sections}
      bonus={bonus}
      criteria={criteria}
      xp={120}
      quickstart={[
        {
          label: "Clone ou abra o projeto FormFire",
          code: "cd formfire\nnpm install\nnpm run dev",
          note: "Se ainda não criou, volte para a Aula 01 e siga o setup completo.",
        },
        {
          label: "Confirme as dependências instaladas",
          code: "npm ls react-hook-form zod @hookform/resolvers react-imask",
          note: "Todos devem aparecer na lista. Se algum faltar: npm install <pacote>",
        },
        {
          label: "Verifique o build sem erros antes de entregar",
          code: "NEXT_DIST_DIR=.next-build npm run build",
        },
      ]}
    />
  );
}
