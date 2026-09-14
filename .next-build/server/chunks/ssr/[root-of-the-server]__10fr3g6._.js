module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},50640,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),this.name="InvariantError"}}},59469,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx <module evaluation>","default")},59394,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/components/slides/SlidePresentation.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/slides/SlidePresentation.tsx","default")},9844,a=>{"use strict";a.i(59469);var b=a.i(59394);a.n(b)},10585,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},68611,a=>{"use strict";let b={src:a.i(10585).default,width:256,height:256};a.s(["default",0,b])},95925,a=>{"use strict";var b=a.i(7997),c=a.i(9844);let d=[{id:1,type:"cover",tag:"Módulo 2.1 · Aula 05",title:"MÁSCARAS\nDE INPUT",subtitle:"CPF, telefone, CEP — o usuário digita números, a máscara formata sozinha."},{id:2,type:"concept",tag:"Por que máscaras?",title:"O problema sem formatação automática",items:[{icon:"😤",text:"O usuário digita '11912345678' — você precisa adivinhar se é (11) 9 1234-5678 ou (119) 1234-5678."},{icon:"🔢",text:"Sem máscara, você precisa validar o regex E ainda remover os caracteres da máscara no backend."},{icon:"🎯",text:"Com máscara: o campo exibe (11) 91234-5678 enquanto o usuário digita — formato garantido, UX clara."},{icon:"🛡️",text:"A máscara não substitui a validação do Zod — ela formata o visual, o Zod verifica o padrão."}],tip:"Máscara e validação são complementares: a máscara guia o usuário, o Zod garante a correção no submit."},{id:3,type:"comparison",tag:"Qual biblioteca?",title:"react-imask vs alternativas",left:{label:"Alternativas comuns",items:["react-input-mask: simples, mas sem manutenção ativa","react-number-format: ótima para moeda/números","react-text-mask: arquivada (abandonada)","Implementação manual: muito código, muitos bugs"]},right:{label:"react-imask (recomendado)",items:["Baseado no IMask.js — maduro e ativo","Suporta máscaras estáticas, dinâmicas e regex","Integra facilmente com react-hook-form","Typescript-friendly com tipagem completa","Funciona com qualquer padrão: CPF, CNPJ, CEP..."]},tip:"react-number-format é excelente para campos de valor monetário (R$ 1.234,56). Para campos de identidade (CPF, telefone), react-imask é mais flexível."},{id:4,type:"code",tag:"Instalação",title:"Instalando e importando o react-imask",codeLabel:"terminal  +  uso básico",code:`# J\xe1 instalado no setup da aula 01 (react-imask)
# Confirme no package.json: "react-imask": "^7.x"

# Se precisar instalar agora:
npm install react-imask

# -----------------------------------------
# Uso b\xe1sico — sem react-hook-form ainda
import { IMaskInput } from "react-imask";

<IMaskInput
  mask="000.000.000-00"   // zeros s\xe3o d\xedgitos
  placeholder="000.000.000-00"
  onAccept={(value) => console.log("Valor aceito:", value)}
/>

// onAccept \xe9 chamado sempre que a m\xe1scara aceita um novo valor
// value \xe9 a string formatada: "123.456.789-00"`,tip:"Na convenção do IMask: '0' aceita um dígito (0-9), 'a' aceita uma letra, '*' aceita qualquer caractere."},{id:5,type:"code",tag:"CPF",title:"Máscara de CPF no formulário",codeLabel:"src/app/alunos/cadastro/page.tsx (CPF)",code:`"use client";

import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormData } from "@/schemas/student.schema";

export default function CadastroPage() {
  const { setValue, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>

      {/* Campo CPF com m\xe1scara */}
      <div>
        <label>CPF</label>
        <IMaskInput
          mask="000.000.000-00"
          placeholder="000.000.000-00"
          onAccept={(value: string) => {
            // atualiza o react-hook-form manualmente
            setValue("cpf", value, { shouldValidate: true });
          }}
        />
        {errors.cpf && (
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.cpf.message}
          </span>
        )}
      </div>

    </form>
  );
}`,tip:"shouldValidate: true faz o Zod revalidar o campo assim que o usuário aceita um valor — feedback imediato."},{id:6,type:"code",tag:"Telefone + CEP",title:"Máscaras dinâmica de telefone e CEP",codeLabel:"src/app/alunos/cadastro/page.tsx (telefone + CEP)",code:`{/* Telefone: aceita 8 ou 9 d\xedgitos ap\xf3s o DDD */}
<IMaskInput
  mask={[
    { mask: "(00) 0000-0000" },   // telefone fixo: 8 d\xedgitos
    { mask: "(00) 00000-0000" },  // celular: 9 d\xedgitos
  ]}
  placeholder="(11) 91234-5678"
  onAccept={(value: string) => setValue("telefone", value, { shouldValidate: true })}
/>
{errors.telefone && <span style={{ color: "red" }}>{errors.telefone.message}</span>}

{/* CEP — se quiser adicionar ao schema */}
<IMaskInput
  mask="00000-000"
  placeholder="00000-000"
  onAccept={(value: string) => setValue("cep", value, { shouldValidate: true })}
/>

{/* Observa\xe7\xe3o sobre o schema Zod do CEP: */}
{/* cep: z.string().regex(/^d{5}-d{3}$/, "CEP inv\xe1lido") */}`,tip:"Máscaras em array (modo dinâmico) fazem o IMask escolher automaticamente qual padrão se encaixa conforme o usuário digita."},{id:7,type:"code",tag:"Controller",title:"Integração com Controller (modo mais robusto)",codeLabel:"src/app/alunos/cadastro/page.tsx",code:`import { useForm, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema, type StudentFormData } from "@/schemas/student.schema";

export default function CadastroPage() {
  const { control, handleSubmit, formState: { errors } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>

      {/* Controller \xe9 o wrapper oficial do react-hook-form para inputs n\xe3o-nativos */}
      <Controller
        name="cpf"
        control={control}
        render={({ field: { onChange, value } }) => (
          <IMaskInput
            mask="000.000.000-00"
            value={value ?? ""}
            onAccept={(v: string) => onChange(v)}
            placeholder="000.000.000-00"
          />
        )}
      />
      {errors.cpf && <span>{errors.cpf.message}</span>}

    </form>
  );
}`,tip:"Controller é a abordagem mais robusta — o react-hook-form gerencia o ciclo de vida do campo totalmente, incluindo reset e defaultValues."},{id:8,type:"code",tag:"Componente reutilizável",title:"MaskedField — um componente para todos os campos",codeLabel:"src/components/MaskedField.tsx",code:`"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  mask: string | Array<{ mask: string }>;
  label: string;
  placeholder?: string;
  error?: string;
}

// Componente gen\xe9rico — funciona com qualquer schema e qualquer m\xe1scara
export function MaskedField<T extends FieldValues>({
  name, control, mask, label, placeholder, error,
}: Props<T>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <IMaskInput
            mask={mask}
            value={value ?? ""}
            onAccept={(v: string) => onChange(v)}
            placeholder={placeholder}
            style={{ padding: "0.6rem", borderRadius: "6px", border: "1px solid #333" }}
          />
        )}
      />
      {error && <span style={{ color: "#ef4444", fontSize: "0.75rem" }}>{error}</span>}
    </div>
  );
}`,tip:"Componentes genéricos com TypeScript Generics parecem complexos, mas o VS Code autocomplete o campo name — experimente!"},{id:9,type:"quiz",tag:"Quiz",title:"O que a máscara '(00) 00000-0000' aceita?",question:"Um usuário digita '11912345678' num campo com mask='(00) 00000-0000'. O que aparece no input?",options:[{text:"11912345678 (sem formatação)",correct:!1,explanation:"A máscara formata automaticamente durante a digitação — o usuário nunca vê o número cru."},{text:"(11) 91234-5678",correct:!0,explanation:"Correto! A máscara aplica () no DDD e o hífen na posição certa — o usuário só precisa digitar os números."},{text:"119-12345678",correct:!1,explanation:"Esse formato não corresponde à máscara (00) 00000-0000. O IMask aplica exatamente o padrão definido."},{text:"Nada — o input rejeita os números",correct:!1,explanation:"A máscara aceita números (0 = dígito 0-9). O input aceita e formata automaticamente."}],xp:15},{id:10,type:"fill-blank",tag:"Mão na massa",title:"Complete a máscara de CPF",instruction:"Complete o valor do atributo mask para formatar um CPF (000.000.000-00):",prefix:`import { IMaskInput } from "react-imask";

<IMaskInput
  mask="_______"
  placeholder="000.000.000-00"
  onAccept={(value: string) => setValue("cpf", value)}
/>`,answer:"000.000.000-00",hint:"No IMask, '0' representa um dígito (0-9). Pontos e hífens são inseridos automaticamente.",xp:20},{id:11,type:"mini-challenge",tag:"🎯 Missão F5",title:"FORMULÁRIO\nCOMPLETO",subtitle:"Máscaras + validação + UX — tudo junto no FormFire",tasks:["Adicione máscara de CPF (000.000.000-00) ao campo cpf usando IMaskInput","Adicione máscara dinâmica ao campo telefone (fixo 8 dígitos E celular 9 dígitos)","Integre as máscaras com o react-hook-form usando Controller ou setValue + onAccept","Confirme que o schema Zod valida o formato com máscara (regex deve bater com o output do IMask)","Crie o componente MaskedField.tsx reutilizável e use-o nos campos cpf e telefone"],bonus:["Adicione um campo CEP com máscara (00000-000) que busca o endereço via ViaCEP ao completar","Extraia a lógica de busca de CEP para um custom hook useCep(cep: string)"],xp:55,nextHref:"/modulos/forms/desafio",nextLabel:"🏆 Desafio Final — FormFire Completo →"}];a.s(["default",0,function(){return(0,b.jsx)(c.default,{slides:d,backHref:"/modulos/forms",backLabel:"Formulários & UX",aulaLabel:"Aula 05 — Máscaras de Input",aulaSlug:"forms-aula-05"})},"metadata",0,{title:"Aula 05 — Máscaras de Input · Web On Fire Academy"}],95925)},44600,a=>{a.n(a.i(95925))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__10fr3g6._.js.map