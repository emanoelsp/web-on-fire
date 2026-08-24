module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},36201,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 03 · Aula 05",title:"DADOS EM\nDASHBOARDS",subtitle:"Transforme números em gráficos — sem virar especialista em D3."},{id:2,type:"concept",tag:"O desafio",title:"Por que gráficos são difíceis",items:[{icon:"📊",text:"Um dashboard cru é uma tabela de números. Ninguém 'enxerga' uma tendência olhando 200 linhas."},{icon:"😵",text:"Fazer gráficos do zero (SVG, escalas, eixos, tooltips) é trabalhoso e cheio de matemática — bibliotecas como D3 têm curva íngreme."},{icon:"🎨",text:"Tremor resolve: componentes de gráfico e métrica prontos, feitos com React + Tailwind — a mesma linguagem que você já domina."},{icon:"🧩",text:"Você passa dados como props e recebe um gráfico bonito, responsivo e interativo. Foco no dado, não no desenho."}]},{id:3,type:"concept",tag:"Anatomia do dashboard",title:"As peças de um bom painel",items:[{icon:"🔢",text:"Cards de métrica (KPIs): os números que importam em destaque — total de alunos, XP médio, taxa de conclusão."},{icon:"📈",text:"Gráfico de linha/área: evolução no tempo — acessos por semana, cadastros por mês."},{icon:"📊",text:"Gráfico de barras: comparação entre categorias — alunos por módulo, XP por aluno."},{icon:"🍩",text:"Gráfico de rosca/pizza: proporção de um todo — distribuição de níveis, status das aulas."}]},{id:4,type:"code",tag:"KPIs",title:"Cards de métrica com Tremor",codeLabel:"MetricasCards.tsx",code:`// npm install @tremor/react
import { Card, Metric, Text, Flex, BadgeDelta } from "@tremor/react";

export function KpiAlunos() {
  return (
    <Card className="max-w-xs">
      <Text>Alunos ativos</Text>
      <Flex justifyContent="start" alignItems="baseline" className="gap-2">
        <Metric>128</Metric>
        <BadgeDelta deltaType="increase">+12%</BadgeDelta>
      </Flex>
      <Text className="mt-2">vs. semana anterior</Text>
    </Card>
  );
}
// Metric = n\xfamero gigante; BadgeDelta = seta de tend\xeancia (verde/vermelho).`,tip:"KPI = Key Performance Indicator. Comece o dashboard pelos KPIs: são a primeira coisa que o professor/gestor olha."},{id:5,type:"code",tag:"Gráficos",title:"Barras e linhas em 5 linhas",codeLabel:"GraficoAcessos.tsx",code:`import { BarChart, DonutChart } from "@tremor/react";

const dados = [
  { semana: "Sem 1", acessos: 45 },
  { semana: "Sem 2", acessos: 72 },
  { semana: "Sem 3", acessos: 68 },
];

// Barras: comparar valores entre categorias
<BarChart
  data={dados}
  index="semana"          // eixo X: o campo de r\xf3tulo
  categories={["acessos"]} // eixo Y: os valores
  colors={["orange"]}
/>

// Rosca: propor\xe7\xe3o de um todo
const niveis = [
  { nome: "Fa\xedsca", qtd: 40 },
  { nome: "Chama", qtd: 25 },
  { nome: "Fogueira", qtd: 15 },
];
<DonutChart data={niveis} category="qtd" index="nome" />`,tip:"O padrão do Tremor: index é o rótulo (categorias/tempo) e categories/category são os números. Aprendeu um gráfico, aprendeu todos."},{id:6,type:"quiz",tag:"Quiz",title:"O gráfico certo para o dado",question:"Você quer mostrar como os acessos evoluíram ao longo de 8 semanas. Qual gráfico é o mais indicado?",options:[{text:"Gráfico de rosca (donut)",correct:!1,explanation:"Rosca mostra proporção de um todo num momento — não evolução no tempo."},{text:"Gráfico de linha ou área",correct:!0,explanation:"Isso! Linha/área é feito para mostrar tendência ao longo do tempo — o olho segue a curva subindo ou descendo."},{text:"Um card de métrica único",correct:!1,explanation:"O KPI mostra UM número atual, não a evolução das 8 semanas."},{text:"Uma tabela com os 8 valores",correct:!1,explanation:"Funciona, mas ninguém 'vê' a tendência numa tabela. O gráfico de linha comunica na hora."}],xp:15},{id:7,type:"concept",tag:"Do dado ao gráfico",title:"De onde vêm os números",items:[{icon:"🔌",text:"Server Component busca os dados (Firestore, API) — exatamente o que você aprendeu no Módulo 02."},{icon:"🔄",text:"Você TRANSFORMA os dados no formato que o gráfico espera: um array de objetos { rótulo, valor }."},{icon:"🖼️",text:"Gráficos do Tremor são Client Components (interativos) — passe os dados prontos do servidor via props."},{icon:"🧮",text:"Agregações comuns: contar por categoria, somar por período, calcular média. JavaScript puro (reduce, filter)."}]},{id:8,type:"code",tag:"Integração",title:"Server busca, Client desenha",codeLabel:"dashboard/page.tsx",code:`// Server Component — busca e agrega
import { getAllProgress } from "@/services/progressService";
import { GraficoNiveis } from "./GraficoNiveis"; // Client Component

export default async function DashboardPage() {
  const alunos = await getAllProgress();

  // agrega: quantos alunos em cada n\xedvel
  const porNivel = alunos.reduce<Record<string, number>>((acc, a) => {
    acc[a.levelName] = (acc[a.levelName] ?? 0) + 1;
    return acc;
  }, {});

  const dados = Object.entries(porNivel).map(([nome, qtd]) => ({ nome, qtd }));

  return <GraficoNiveis dados={dados} />; // passa pronto para o Client
}`,tip:"Esse é o mesmo desenho do backoffice do professor deste curso: um Server Component agrega o progresso dos alunos e entrega para a UI."},{id:9,type:"fill-blank",tag:"Mão na massa",title:"Complete o gráfico",instruction:"No BarChart do Tremor, qual prop define o campo usado como rótulo do eixo X (as categorias)? (digite só o nome da prop)",prefix:`<BarChart
  data={dados}
  _______="semana"
  categories={["acessos"]}
/>`,answer:"index",hint:"É a prop que 'indexa' cada barra pelo rótulo.",xp:20},{id:10,type:"mini-challenge",tag:"🎯 Missão 13",title:"PAINEL DE\nCONTROLE",subtitle:"Construa um dashboard que conta uma história",tasks:["Instale @tremor/react e configure conforme a doc (presets do Tailwind)","Crie mock data: um array de acessos por semana e um de alunos por nível","Monte 3 cards de KPI: total de alunos, XP médio e taxa de conclusão","Adicione um BarChart de acessos por semana","Adicione um DonutChart de distribuição de alunos por nível","Organize tudo num grid responsivo (1 coluna no mobile, 3 no desktop)"],bonus:["Use um reduce para agregar os dados a partir de uma lista 'crua' de alunos","Adicione um BadgeDelta mostrando a variação vs. período anterior"],xp:50,nextHref:"/modulos/ui/desafio",nextLabel:"🏆 Desafio Final do Módulo →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/ui",backLabel:"Estilização & UI",aulaLabel:"Aula 05 — Visualização de Dados",aulaSlug:"ui-dashboards"})},"metadata",0,{title:"Aula 05 — Visualização de Dados para Dashboards · Web On Fire Academy"}],36201)},54515,a=>{a.n(a.i(36201))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0tv6er-._.js.map