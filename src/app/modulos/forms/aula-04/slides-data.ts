import type { Slide } from "@/types/slides";

export const FORMS_AULA04_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 2.1 · Aula 04",
    title: "VALIDAÇÃO\nDE FORMULÁRIOS\nCOM ZOD",
    subtitle: "Dados limpos antes de tocar o banco — garantia TypeScript de ponta a ponta.",
  },
  {
    id: 2,
    type: "concept",
    tag: "O problema",
    title: "O que acontece sem validação",
    items: [
      { icon: "📧", text: "Usuário digita 'joao' no campo email — o dado vai para o banco como está, corrompendo registros." },
      { icon: "🔢", text: "CPF em branco ou com letras — o sistema tenta processar e quebra em produção." },
      { icon: "😤", text: "Sem mensagem de erro útil — o usuário não sabe o que errou e abandona o formulário." },
      { icon: "🔒", text: "Validação só no servidor — o dado trafega pela rede antes de ser rejeitado, desperdício de latência." },
    ],
    tip: "Validação no cliente dá feedback imediato. Validação no servidor é a segurança real. Zod faz as duas com o mesmo schema.",
  },
  {
    id: 3,
    type: "comparison",
    tag: "Zod vs Yup",
    title: "Por que Zod em 2025?",
    left: {
      label: "Yup (mais antigo)",
      items: [
        "Inferência TypeScript manual e verbosa",
        "API mais complexa para tipos aninhados",
        "Mensagens de erro menos descritivas",
        "Manutenção mais lenta (menos ativo)",
        "Ainda muito usado em código legado",
      ],
    },
    right: {
      label: "Zod (recomendado)",
      items: [
        "TypeScript-first: inferência automática",
        "API fluente e intuitiva (.string().email())",
        "Erros descritivos e localizáveis",
        "Ativo, crescente, usado pelo tRPC/Next.js",
        "Um schema serve para frontend e backend",
      ],
    },
    tip: "Yup ainda funciona — mas se você está começando hoje, vá de Zod. O ecossistema Next.js convergiu para ele.",
  },
  {
    id: 4,
    type: "code",
    tag: "Instalação",
    title: "Dependências (já instaladas no setup)",
    codeLabel: "terminal  +  verificação",
    code: `# Se ainda não instalou na aula 01:
npm install react-hook-form zod @hookform/resolvers

# react-hook-form → gerencia o estado do formulário
# zod             → define e valida o schema dos dados
# @hookform/resolvers → conecta o Zod ao react-hook-form

# Verifique o package.json:
# "react-hook-form": "^7.x",
# "zod": "^3.x",
# "@hookform/resolvers": "^3.x"`,
    tip: "@hookform/resolvers é o elo que permite usar qualquer schema de validação (Zod, Yup, Joi...) com o react-hook-form.",
  },
  {
    id: 5,
    type: "code",
    tag: "Schema Zod",
    title: "Definindo o schema do formulário",
    codeLabel: "src/schemas/student.schema.ts",
    code: `import { z } from "zod";

export const studentSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter ao menos 3 caracteres")
    .max(100, "Nome muito longo"),

  email: z
    .string()
    .email("Informe um email válido"),

  cpf: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (formato: 000.000.000-00)"),

  telefone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Telefone inválido"),

  turma: z
    .string()
    .min(1, "Selecione a turma")
    .optional(),
});

// TypeScript infere o tipo automaticamente a partir do schema 🎉
export type StudentFormData = z.infer<typeof studentSchema>;`,
    tip: "z.infer<typeof schema> gera o tipo TypeScript automaticamente — você não precisa definir a interface duas vezes.",
  },
  {
    id: 6,
    type: "code",
    tag: "useForm + zodResolver",
    title: "Conectando o schema ao formulário",
    codeLabel: "src/app/alunos/cadastro/page.tsx",
    code: `"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormData } from "@/schemas/student.schema";

export default function CadastroPage() {
  const {
    register,          // vincula input ao formulário
    handleSubmit,      // envolve o onSubmit com validação automática
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema), // conecta o Zod
    defaultValues: { nome: "", email: "", cpf: "", telefone: "" },
  });

  async function onSubmit(data: StudentFormData) {
    // data já está validado e tipado pelo Zod
    console.log("Dados válidos:", data);
    // aqui viria: await fetch('/api/alunos', { method: 'POST', body: JSON.stringify(data) })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* inputs com register — próximo slide */}
    </form>
  );
}`,
    tip: "handleSubmit só chama onSubmit se todos os campos passarem na validação do Zod — nenhum dado inválido escapa.",
  },
  {
    id: 7,
    type: "code",
    tag: "Formulário completo",
    title: "Inputs com registro e mensagens de erro",
    codeLabel: "src/app/alunos/cadastro/page.tsx (continuação)",
    code: `return (
  <main className="min-h-screen bg-zinc-950 px-4 py-10">
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Cadastrar Aluno</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm">Nome completo</label>
          <input
            {...register("nome")}
            placeholder="Ana Lima"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          {/* errors.nome só aparece após tentativa de submit ou ao sair do campo */}
          {errors.nome && <span className="text-red-400 text-xs">{errors.nome.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="ana@email.com"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-zinc-400 text-sm">CPF</label>
          <input
            {...register("cpf")}
            placeholder="000.000.000-00"
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          {errors.cpf && <span className="text-red-400 text-xs">{errors.cpf.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
        >
          {isSubmitting ? "Enviando..." : "Cadastrar"}
        </button>

      </form>
    </div>
  </main>
);`,
    tip: "O spread {...register('campo')} injeta os handlers onChange, onBlur e a ref — tudo que o react-hook-form precisa para rastrear o campo.",
  },
  {
    id: 8,
    type: "code",
    tag: "Mensagens PT-BR",
    title: "Personalizando e reutilizando mensagens",
    codeLabel: "src/schemas/student.schema.ts (refinado)",
    code: `import { z } from "zod";

// Mensagens centralizadas — mudança em um lugar reflete em todo o app
const MSG = {
  required: "Campo obrigatório",
  email: "Informe um email válido (ex: nome@dominio.com)",
  cpfFormat: "CPF deve estar no formato 000.000.000-00",
  telefoneFormat: "Telefone deve estar no formato (00) 00000-0000",
} as const;

export const studentSchema = z.object({
  nome: z
    .string({ required_error: MSG.required })
    .min(3, "Nome deve ter ao menos 3 letras")
    .max(100),

  email: z
    .string({ required_error: MSG.required })
    .email(MSG.email),

  cpf: z
    .string({ required_error: MSG.required })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, MSG.cpfFormat),

  telefone: z
    .string({ required_error: MSG.required })
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, MSG.telefoneFormat),
});

export type StudentFormData = z.infer<typeof studentSchema>;`,
    tip: "Centralizar as mensagens facilita tradução, auditoria e mudanças de tom (formal vs. informal) — sem caçar strings pelo código.",
  },
  {
    id: 9,
    type: "quiz",
    tag: "Quiz",
    title: "O que z.string().email() faz com dados inválidos?",
    question: "Você chama studentSchema.parse({ email: 'joao' }). O que o Zod retorna?",
    options: [
      {
        text: "Retorna o objeto { email: 'joao' } sem nenhum erro",
        correct: false,
        explanation: "'joao' não é um email válido — o Zod lança uma ZodError com a mensagem configurada.",
      },
      {
        text: "Lança uma ZodError com a mensagem de email inválido",
        correct: true,
        explanation: "Correto! .parse() lança exceção se os dados forem inválidos. Use .safeParse() se quiser tratar o erro sem try/catch.",
      },
      {
        text: "Retorna null silenciosamente",
        correct: false,
        explanation: "O Zod nunca retorna null silenciosamente em .parse() — erro = exceção. Para comportamento silencioso, use .safeParse().",
      },
      {
        text: "Corrige o email automaticamente para o formato correto",
        correct: false,
        explanation: "O Zod valida, não corrige. Para transformações, use .transform() ou .preprocess() explicitamente.",
      },
    ],
    xp: 15,
  },
  {
    id: 10,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o zodResolver",
    instruction: "Complete a linha que conecta o schema Zod ao react-hook-form:",
    prefix: `import { useForm } from "react-hook-form";
import { _______ } from "@hookform/resolvers/zod";
import { studentSchema } from "@/schemas/student.schema";

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: _______(studentSchema),
});`,
    answer: "zodResolver",
    hint: "A função importada e usada tem o mesmo nome: zodResolver.",
    xp: 20,
  },
  {
    id: 11,
    type: "mini-challenge",
    tag: "🎯 Missão F4",
    title: "FORMULÁRIO\nSEM BURACOS",
    subtitle: "Nenhum dado inválido passa pelo FormFire",
    tasks: [
      "Crie src/schemas/student.schema.ts com z.object() para nome, email, cpf e telefone",
      "Use z.infer<typeof studentSchema> para gerar o tipo StudentFormData automaticamente",
      "Instale/confirme @hookform/resolvers e importe zodResolver",
      "Conecte o schema ao formulário com resolver: zodResolver(studentSchema)",
      "Exiba errors.campo.message embaixo de cada input quando houver erro",
      "Teste: tente submeter o formulário vazio e confirme que as mensagens aparecem",
    ],
    bonus: [
      "Use z.string().min(1, 'Campo obrigatório') em vez de optional() para tornar todos os campos obrigatórios",
      "Adicione mode: 'onChange' no useForm para validar ao digitar (em vez de esperar o submit)",
    ],
    xp: 50,
    nextHref: "/modulos/forms/aula-05",
    nextLabel: "Aula 05: Máscaras de Input →",
  },
];
