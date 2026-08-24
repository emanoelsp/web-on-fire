module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},54454,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 03 · Aula 04",title:"MICRO-INTERAÇÕES\n& FEEDBACK",subtitle:"O app conversa com o usuário: toasts, alertas e uma chuva de confete."},{id:2,type:"concept",tag:"Por que importa",title:"Silêncio é ansiedade",items:[{icon:"🤐",text:"O usuário clica em 'Salvar' e... nada acontece na tela. Salvou? Travou? Ele clica de novo — e duplica o registro."},{icon:"💬",text:"Feedback é a resposta do app: 'recebi', 'deu certo', 'algo falhou'. Reduz ansiedade e erros."},{icon:"⚖️",text:"Mas há um espectro: nem tudo merece um pop-up no meio da tela. A intensidade tem que combinar com a gravidade."},{icon:"🎯",text:"3 níveis: toast (discreto), alerta modal (decisão séria), celebração (conquista). Cada um tem sua ferramenta."}]},{id:3,type:"diagram",tag:"Espectro do feedback",title:"Escolha a intensidade certa",subtitle:"Do sussurro discreto ao grito de vitória",layers:[{icon:"🍞",label:"TOAST — Sonner",desc:"Discreto, some sozinho. 'Salvo com sucesso', 'Copiado'. Não interrompe o fluxo.",color:"green",connector:"a ação é séria e precisa de decisão?"},{icon:"⚠️",label:"ALERTA MODAL — SweetAlert2",desc:"Bloqueia a tela e exige resposta. 'Excluir permanentemente? Sim/Não'.",color:"amber",connector:"o usuário conquistou algo especial?"},{icon:"🎉",label:"CELEBRAÇÃO — React Confetti",desc:"Recompensa visual. Fim de um desafio, cadastro concluído, conquista desbloqueada.",color:"fire"}],tip:"Erro comum: usar modal bloqueante para 'Salvo!' (irritante) ou toast para 'Excluir conta?' (perigoso demais). Combine gravidade e intensidade."},{id:4,type:"code",tag:"Sonner",title:"Toasts com Sonner",codeLabel:"toasts.tsx",code:`// npm install sonner
// 1. No layout raiz, adicione o container UMA vez:
import { Toaster } from "sonner";
// <body> ... <Toaster richColors position="top-right" /> </body>

// 2. Dispare de qualquer lugar (Client Component):
"use client";
import { toast } from "sonner";

toast.success("Aluno cadastrado! 🔥");
toast.error("Falha ao salvar. Tente novamente.");
toast.info("Sincronizando progresso...");

// Toast de promessa: mostra loading → sucesso/erro sozinho
toast.promise(salvarAluno(dados), {
  loading: "Salvando...",
  success: "Salvo com sucesso!",
  error: "N\xe3o foi poss\xedvel salvar.",
});`,tip:"toast.promise é o favorito para operações assíncronas: um só comando cobre os 3 estados (carregando, ok, erro) automaticamente."},{id:5,type:"code",tag:"SweetAlert2",title:"Alertas críticos com SweetAlert2",codeLabel:"confirmar.tsx",code:`// npm install sweetalert2
import Swal from "sweetalert2";

async function excluirAluno(id: string) {
  const r = await Swal.fire({
    title: "Excluir aluno?",
    text: "Esta a\xe7\xe3o n\xe3o pode ser desfeita!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, excluir",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#dc2626",
  });

  if (r.isConfirmed) {
    await deletarDoBanco(id);
    Swal.fire("Exclu\xeddo!", "O aluno foi removido.", "success");
  }
}`,tip:"Use o modal bloqueante só para ações destrutivas ou irreversíveis. Ele PARA o usuário de propósito — respeite esse peso."},{id:6,type:"quiz",tag:"Quiz",title:"A ferramenta certa",question:"O usuário acabou de copiar um link para a área de transferência. Qual feedback é o mais adequado?",options:[{text:"Um modal bloqueante do SweetAlert2 com botão 'OK'",correct:!1,explanation:"Exagero! Copiar um link é trivial. Parar a tela e exigir um clique irrita o usuário."},{text:"Um toast discreto do Sonner: 'Link copiado!'",correct:!0,explanation:"Perfeito: confirma a ação, some sozinho e não interrompe. Feedback proporcional à ação."},{text:"Uma chuva de confete com React Confetti",correct:!1,explanation:"Celebração é para conquistas reais. Copiar link não é um marco — o confete perde o sentido se aparecer sempre."},{text:"Nenhum feedback — copiar é óbvio",correct:!1,explanation:"Sem confirmação, o usuário não sabe se funcionou e tenta de novo. Um toast rápido resolve."}],xp:15},{id:7,type:"code",tag:"React Confetti",title:"Celebrando conquistas",codeLabel:"Celebracao.tsx",code:`// npm install react-confetti
"use client";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export function Celebracao({ ativo }: { ativo: boolean }) {
  const [tamanho, setTamanho] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setTamanho({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  if (!ativo) return null;
  return (
    <Confetti
      width={tamanho.w}
      height={tamanho.h}
      recycle={false}          // dispara uma vez e para
      numberOfPieces={300}
      colors={["#FF5500", "#FF8C00", "#FFB800"]}
    />
  );
}
// Dispare quando o aluno concluir um desafio, cadastro, miss\xe3o...`,tip:"recycle={false} é essencial: sem isso, o confete cai para sempre. Você quer uma explosão de comemoração, não uma nevasca eterna."},{id:8,type:"concept",tag:"Regras de ouro",title:"Feedback que ajuda, não atrapalha",items:[{icon:"⏱️",text:"Toasts somem sozinhos (3-4s). Nunca exija fechar manualmente algo informativo."},{icon:"🚫",text:"Modal bloqueante SÓ para decisões sérias/irreversíveis. Abusar treina o usuário a clicar 'OK' sem ler."},{icon:"🎉",text:"Celebração é rara por design: se tudo comemora, nada é especial. Guarde para conquistas reais."},{icon:"🎨",text:"Mantenha a identidade: cores e tom das mensagens seguem a marca (no nosso caso, o fire orange 🔥)."}]},{id:9,type:"fill-blank",tag:"Mão na massa",title:"Complete o toast",instruction:"Você quer mostrar uma notificação verde de sucesso com o Sonner. Complete a chamada (digite o método completo até o parêntese, ex: toast.xxx):",prefix:`import { toast } from "sonner";

_______________("Cadastro realizado! 🔥");`,answer:"toast.success",hint:"É o objeto toast + o método para mensagens positivas.",xp:20},{id:10,type:"mini-challenge",tag:"🎯 Missão 12",title:"APP QUE\nCONVERSA",subtitle:"Dê voz à sua interface nos 3 níveis",tasks:["Instale sonner, sweetalert2 e react-confetti; adicione o <Toaster /> no layout raiz","Num botão 'Salvar', dispare toast.success ao concluir e toast.error ao falhar","Use toast.promise numa operação async simulada (setTimeout) com loading/success/error","Num botão 'Excluir', abra um SweetAlert2 de confirmação antes de agir","Crie um botão 'Concluir desafio' que dispara React Confetti (recycle false) por alguns segundos","Garanta que cada feedback combina com a gravidade da ação (toast x modal x confete)"],bonus:["Personalize as cores do Sonner e do confete com a paleta fire (#FF5500)","Combine: ao concluir o desafio, dispare confete E um toast.success juntos"],xp:50,nextHref:"/modulos/ui/dashboards",nextLabel:"Aula 05: Visualização de Dados →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/ui",backLabel:"Estilização & UI",aulaLabel:"Aula 04 — Micro-interações e Feedback",aulaSlug:"ui-microinteracoes"})},"metadata",0,{title:"Aula 04 — Micro-interações e Feedback · Web On Fire Academy"}],54454)},34646,a=>{a.n(a.i(54454))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0qesv35._.js.map