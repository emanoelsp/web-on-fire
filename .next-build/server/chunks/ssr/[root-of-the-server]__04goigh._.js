module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},2744,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 01 · Aula 02",title:"TIPAGEM\nESTÁTICA",subtitle:"TypeScript: descubra o bug antes de rodar — não às 3h da manhã em produção."},{id:2,type:"concept",tag:"O problema",title:"JavaScript confia demais em você",items:[{icon:"🤝",text:"JavaScript tem tipagem DINÂMICA: uma variável aceita qualquer coisa, a qualquer momento — número agora, texto depois."},{icon:"💣",text:'O erro clássico: soma que vira concatenação ("10" + 5 = "105"), undefined is not a function, NaN se espalhando.'},{icon:"🌙",text:"Pior: esses erros só aparecem QUANDO O CÓDIGO RODA — às vezes só num caso raro, dias depois, na máquina do usuário."},{icon:"🛡️",text:"TypeScript adiciona tipagem ESTÁTICA: os tipos são verificados ANTES de rodar, ainda no editor."}]},{id:3,type:"definition",tag:"Definição",title:"TypeScript em uma frase",quote:"TypeScript é um superconjunto do JavaScript que adiciona tipos estáticos: todo código JS válido é TS válido, e o compilador remove os tipos e gera JavaScript puro no final.",highlights:["superconjunto do JavaScript","tipos estáticos","gera JavaScript puro"],tip:"O navegador e o Node não executam TypeScript — executam o JavaScript gerado. Os tipos existem só em tempo de desenvolvimento."},{id:4,type:"comparison",tag:"Dinâmica vs Estática",title:"As duas filosofias de tipagem",left:{label:"Dinâmica (JS puro)",items:["O tipo vive no VALOR, em runtime","Erros aparecem só ao executar",'let x = 5; x = "oi" — tudo bem!',"Refatorar é andar no escuro","Autocomplete limitado no editor"]},right:{label:"Estática (TypeScript)",items:["O tipo vive na VARIÁVEL, no código","Erros aparecem enquanto você digita",'x = "oi" → erro: era number!',"Refatorar com rede de proteção","Autocomplete que parece mágica"]},tip:"Estudos em grandes bases de código estimam que ~15% dos bugs de JavaScript seriam pegos pelo TypeScript antes do deploy."},{id:14,type:"flow",tag:"Modelo mental",title:"Onde o erro é pego: compilação vs runtime",subtitle:"O TypeScript puxa a descoberta do bug para a esquerda da linha do tempo",nodes:[{icon:"✍️",label:"VOCÊ ESCREVE",desc:'TypeScript no editor, com um bug de tipo (ex.: xp: "dez").',color:"neutral"},{icon:"🛡️",label:"TSC VERIFICA",desc:"O compilador confere os tipos na hora, enquanto você digita.",color:"blue"},{icon:"🐛",label:"BUG BARRADO",desc:"Erro em vermelho no editor — antes de rodar uma linha.",color:"amber"},{icon:"✅",label:"VIRA JS E RODA",desc:"Só o código que passou na checagem chega ao navegador/Node.",color:"green"}],tip:"Sem TypeScript, o mesmo bug passaria batido e só apareceria em RUNTIME — muitas vezes em produção, com o usuário na frente. Isso é o 'shift left': descobrir o erro o mais cedo possível."},{id:5,type:"code",tag:"Primitivos",title:"Os tipos que você usa todo dia",codeLabel:"primitivos.ts",code:`// Anota\xe7\xe3o expl\xedcita: vari\xe1vel ':' tipo
const nome: string = "Ana";
const idade: number = 22;
const ativo: boolean = true;
const tags: string[] = ["node", "typescript"];

// Mas o TS \xe9 esperto: INFER\xcaNCIA de tipos
const curso = "Web On Fire";   // j\xe1 sabe que \xe9 string
const nota = 9.5;              // j\xe1 sabe que \xe9 number

// Uni\xe3o de tipos: "um OU outro"
let id: string | number = 42;
id = "abc-42";                 // ✅ ok, string tamb\xe9m vale

// O especial: null e undefined s\xe3o tipos!
let apelido: string | null = null;`,tip:"Regra de ouro: deixe a inferência trabalhar. Anote tipos onde eles não são óbvios — parâmetros de função e retornos, principalmente."},{id:6,type:"code",tag:"Interfaces",title:"Interface: o contrato dos objetos",codeLabel:"interfaces.ts",code:`// Descreve a FORMA que um objeto deve ter
interface Aluno {
  nome: string;
  email: string;
  xp: number;
  badges: string[];
  githubUrl?: string;   // '?' = opcional
}

// Agora o TS fiscaliza o contrato:
const ana: Aluno = {
  nome: "Ana",
  email: "ana@email.com",
  xp: 350,
  badges: ["primeira_faisca"],
};  // ✅ githubUrl pode faltar (\xe9 opcional)

function apresentar(aluno: Aluno) {
  // autocomplete completo de aluno. aqui dentro!
  return \`\${aluno.nome} tem \${aluno.xp} XP\`;
}`,tip:"É exatamente assim neste site: os slides que você está vendo seguem interfaces como CoverSlide e QuizSlide em src/types/slides.ts."},{id:7,type:"code",tag:"Type Aliases",title:"Type: apelidos para qualquer tipo",codeLabel:"types.ts",code:`// type d\xe1 nome a QUALQUER tipo — n\xe3o s\xf3 objetos
type ID = string | number;

// Uni\xf5es literais: s\xf3 valores espec\xedficos!
type Dificuldade = "facil" | "medio" | "dificil";

type Atividade = {
  id: ID;
  titulo: string;
  dificuldade: Dificuldade;
};

const quiz: Atividade = {
  id: 1,
  titulo: "Quiz de Node",
  dificuldade: "medio",     // "media" seria ERRO ✋
};

// interface ou type? Para objetos, os dois funcionam.
// Conven\xe7\xe3o comum: interface para objetos/contratos,
// type para uni\xf5es, aliases e combina\xe7\xf5es.`,tip:'Uniões literais como "facil" | "medio" | "dificil" eliminam categorias inteiras de bugs de digitação — o editor só aceita (e sugere) os valores válidos.'},{id:8,type:"quiz",tag:"Quiz",title:"Pegue o erro",question:'Com type Status = "ativo" | "inativo", o que acontece com: const s: Status = "Ativo"; (com A maiúsculo)?',options:[{text:"Funciona — TypeScript ignora maiúsculas",correct:!1,explanation:'Tipos literais são exatos: "Ativo" e "ativo" são strings diferentes.'},{text:"Erro em runtime, quando o código rodar",correct:!1,explanation:"Esse é o comportamento do JS puro! O TypeScript pega ANTES: o código nem compila."},{text:"Erro de compilação, antes mesmo de rodar",correct:!0,explanation:"Exato! O compilador avisa na hora: Type '\"Ativo\"' is not assignable to type 'Status'. Bug morto no nascimento."},{text:"O valor vira undefined silenciosamente",correct:!1,explanation:"TypeScript nunca altera valores — ele só verifica. Quem atribui é você; ele barra o que não encaixa."}],xp:15},{id:9,type:"code",tag:"Asserções",title:"Asserções: quando você sabe mais que o TS",codeLabel:"assercoes.ts",code:`// 'as' — afirma um tipo mais espec\xedfico
const dados = JSON.parse(texto) as Aluno;
// JSON.parse retorna 'any'; voc\xea garante que \xe9 Aluno

// Caso cl\xe1ssico no DOM:
const input = document.querySelector("#email") as HTMLInputElement;
input.value = "ana@email.com";  // sem o 'as', .value seria erro

// '!' — afirma "isso n\xe3o \xe9 null"
const botao = document.querySelector("button")!;

// ⚠️ CUIDADO: asser\xe7\xe3o \xe9 uma PROMESSA sua, n\xe3o uma verifica\xe7\xe3o.
// Se o JSON n\xe3o for um Aluno de verdade... o erro volta pro runtime.
const x = "texto" as unknown as number;  // compila... e mente. 🙈`,tip:"Asserção não converte nada — só cala o compilador. Use pouco e prefira validar os dados de verdade (na dúvida, verifique com typeof/in)."},{id:10,type:"code",tag:"Generics",title:"Generics: tipos que recebem tipos",codeLabel:"generics.ts",code:`// O problema: uma fun\xe7\xe3o que serve para V\xc1RIOS tipos
function primeiro<T>(lista: T[]): T | undefined {
  return lista[0];
}

const n = primeiro([10, 20, 30]);        // n \xe9 number
const s = primeiro(["a", "b", "c"]);     // s \xe9 string
// mesmo c\xf3digo, tipo preservado — sem any!

// Voc\xea j\xe1 usa generics sem perceber:
const nomes: Array<string> = ["Ana", "Bia"];
const resposta: Promise<Aluno> = buscarAluno(1);
const [xp, setXp] = useState<number>(0);   // React!

// Utilit\xe1rios prontos do TS:
type AlunoParcial  = Partial<Aluno>;  // tudo opcional
type SoLeitura     = Readonly<Aluno>; // nada muda
type SemEmail      = Omit<Aluno, "email">;
type SoNomeEXp     = Pick<Aluno, "nome" | "xp">;`,tip:"Leia <T> como 'um tipo a definir'. Quem chama a função decide o T — e o TypeScript propaga esse tipo por todo o caminho."},{id:11,type:"fill-blank",tag:"Mão na massa",title:"Complete o contrato",instruction:"Que palavra-chave declara o contrato de forma de um objeto em TypeScript? (a mais usada para objetos)",prefix:`_________ Curso {
  titulo: string;
  cargaHoraria: number;
  ativo: boolean;
}`,answer:"interface",hint:"Não é type nem class — é o contrato clássico de objetos.",xp:20},{id:12,type:"concept",tag:"No projeto real",title:"TypeScript no seu dia a dia Next.js",items:[{icon:"📁",text:"Arquivos .ts (lógica) e .tsx (componentes com JSX) — o create-next-app já configura tudo."},{icon:"⚙️",text:"tsconfig.json controla o rigor. strict: true é o padrão do curso — mais reclamação agora, menos bug depois."},{icon:"🧩",text:"Props de componentes React são interfaces: interface Props { titulo: string } — o editor avisa se faltar prop."},{icon:"🔥",text:"Neste projeto: os tipos dos slides, módulos e do sistema de XP são interfaces em src/types/ — TypeScript de ponta a ponta."}]},{id:13,type:"mini-challenge",tag:"🎯 Missão TS",title:"CONTRATOS\nDE AÇO",subtitle:"Modele o domínio da academy com tipos",tasks:["Crie um projeto: npm create vite@latest lab-ts (template vanilla-ts) ou use o TS Playground online","Crie a interface Aluno: nome, email, xp (number) e badges (string[])",'Crie o type Dificuldade = "facil" | "medio" | "dificil"',"Crie a interface Atividade: id (string | number), titulo, dificuldade e opcional prazo?","Escreva ganharXP(aluno: Aluno, pontos: number): Aluno retornando um NOVO objeto",'Provoque 2 erros de propósito (xp: "dez", dificuldade: "media") e leia as mensagens'],bonus:["Use Partial<Aluno> numa função atualizarAluno(aluno, mudancas)","Crie primeiro<T>(lista: T[]) e teste com number[] e string[]"],xp:50,nextHref:"/modulos/infra/git",nextLabel:"Aula 03: Git & GitHub →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/infra",backLabel:"Infraestrutura",aulaLabel:"Aula 02 — Tipagem Estática (TypeScript)",aulaSlug:"infra-typescript"})},"metadata",0,{title:"Aula 02 — Tipagem Estática para Web · Web On Fire Academy"}],2744)},5311,a=>{a.n(a.i(2744))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__04goigh._.js.map