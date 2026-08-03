import type { Slide } from "@/types/slides";

export const AULA_TERMINAL_SLIDES: Slide[] = [
  {
    id: 1,
    type: "cover",
    tag: "Módulo 01 · Aula 04 · Nivelamento",
    title: "TERMINAL:\nCMD & BASH",
    subtitle: "Os comandos essenciais para navegar pelo computador pela linha de comando — nos dois mundos.",
  },
  {
    id: 2,
    type: "concept",
    tag: "Contexto",
    title: "Por que dois terminais?",
    items: [
      { icon: "🪟", text: "No Windows o terminal clássico é o CMD (Prompt de Comando), herança do MS-DOS." },
      { icon: "🐧", text: "No Linux e no macOS o padrão é o Bash (e similares como Zsh) — o mundo Unix." },
      { icon: "🔀", text: "Ao instalar o Git no Windows você ganha o Git Bash: um Bash rodando dentro do Windows." },
      { icon: "🎯", text: "Como desenvolvedor você vai encontrar os dois. Saber traduzir um comando para o outro é essencial." },
    ],
    tip: "A maioria dos tutoriais, do Node e do Git assume Bash. No Windows, prefira o Git Bash ou o PowerShell para acompanhar sem atrito.",
  },
  {
    id: 3,
    type: "comparison",
    tag: "Os dois mundos",
    title: "CMD vs Bash",
    left: {
      label: "CMD (Windows)",
      items: [
        "Prompt de Comando / MS-DOS",
        "Caminhos com barra invertida: C:\\Users",
        "Não diferencia maiúsc./minúsc.",
        "Comandos próprios: dir, cls, del",
        "Vem instalado no Windows",
      ],
    },
    right: {
      label: "Bash (Linux / macOS / Git Bash)",
      items: [
        "Shell do mundo Unix",
        "Caminhos com barra normal: /home/user",
        "Diferencia maiúsc./minúsc.",
        "Comandos Unix: ls, clear, rm",
        "Padrão em servidores e no deploy",
      ],
    },
    tip: "Muita coisa é igual: cd, cd .. e mkdir funcionam nos dois. A diferença aparece em listar, limpar e apagar.",
  },
  {
    id: 4,
    type: "files",
    tag: "Navegação",
    title: "Onde estou e como me movo",
    codeLabel: "navegação — CMD  vs  Bash",
    code: `AÇÃO                       CMD (Windows)      Bash (Unix)
──────────────────────────────────────────────────────────
Mostrar a pasta atual      cd                 pwd
Listar o conteúdo          dir                ls
Entrar em uma pasta        cd projetos        cd projetos
Voltar um nível            cd ..              cd ..
Ir para a raiz do disco    cd \\               cd /
Ir para a home             cd %USERPROFILE%   cd ~
Limpar a tela              cls                clear`,
    tip: "cd sozinho no CMD mostra a pasta atual; no Bash quem faz isso é o pwd (print working directory). cd e cd .. são idênticos nos dois.",
  },
  {
    id: 5,
    type: "files",
    tag: "Criar e remover",
    title: "Pastas e arquivos",
    codeLabel: "criar / remover — CMD  vs  Bash",
    code: `AÇÃO                       CMD (Windows)      Bash (Unix)
──────────────────────────────────────────────────────────
Criar pasta                mkdir app          mkdir app
Criar arquivo vazio        type nul > a.txt   touch a.txt
Remover pasta VAZIA        rmdir app          rmdir app
Remover pasta + conteúdo   rmdir /s app       rm -r app
Remover arquivo            del a.txt          rm a.txt`,
    tip: "mkdir é igual nos dois. Cuidado com rm -r e rmdir /s: eles apagam a pasta e tudo dentro dela, sem lixeira e sem confirmação.",
  },
  {
    id: 6,
    type: "code",
    tag: "Na prática",
    title: "Uma sessão real de terminal",
    codeLabel: "Bash — criando a base de um projeto",
    code: `$ pwd                      # onde estou?
/home/aluno

$ mkdir web-on-fire        # cria a pasta do projeto
$ cd web-on-fire           # entra nela
$ pwd
/home/aluno/web-on-fire

$ mkdir src                # cria uma subpasta
$ ls                       # lista o conteúdo
src

$ cd ..                    # volta um nível
$ rm -r web-on-fire        # remove tudo (cuidado!)`,
    tip: "No CMD a mesma sessão trocaria pwd→cd, ls→dir e rm -r→rmdir /s. A lógica de navegar é exatamente a mesma.",
  },
  {
    id: 7,
    type: "concept",
    tag: "Produtividade",
    title: "Truques que valem para os dois",
    items: [
      { icon: "⭾", text: "Tab completa nomes de pastas e arquivos automaticamente — digite as primeiras letras e pressione Tab." },
      { icon: "⬆️", text: "As setas ↑ e ↓ navegam pelo histórico de comandos que você já digitou." },
      { icon: "📁", text: "Nomes com espaço precisam de aspas: cd \"Meus Documentos\"." },
      { icon: "🧭", text: "Um caminho pode ser relativo (src/app) ou absoluto (C:\\Users\\... ou /home/...)." },
    ],
    tip: "Tab é o atalho mais importante do terminal: evita erros de digitação e acelera tudo. Use sem moderação.",
  },
  {
    id: 8,
    type: "quiz",
    tag: "Quiz",
    title: "Teste rápido",
    question:
      "Você está no Git Bash (Windows) e quer ver a lista de arquivos da pasta atual. Qual comando usar?",
    options: [
      {
        text: "dir — é o comando de listar do Windows",
        correct: false,
        explanation: "dir é do CMD. No Bash (mesmo no Git Bash dentro do Windows), quem lista é o ls.",
      },
      {
        text: "ls — o comando de listar do Bash",
        correct: true,
        explanation: "Isso! O Git Bash é um shell Unix, então usa ls para listar, mesmo rodando no Windows.",
      },
      {
        text: "pwd — mostra os arquivos da pasta",
        correct: false,
        explanation: "pwd mostra o caminho da pasta atual, não os arquivos dentro dela. Para listar, use ls.",
      },
      {
        text: "cd — abre a lista de arquivos",
        correct: false,
        explanation: "cd serve para mudar de pasta. Sozinho no CMD mostra o caminho atual, mas não lista arquivos.",
      },
    ],
    xp: 15,
  },
  {
    id: 9,
    type: "fill-blank",
    tag: "Mão na massa",
    title: "Complete o comando",
    instruction:
      "Você está dentro da pasta src e precisa voltar para a pasta anterior (um nível acima). Digite o comando (igual no CMD e no Bash):",
    prefix: `$ pwd
/home/aluno/web-on-fire/src

$ _______`,
    answer: "cd ..",
    hint: "É o comando de mudar de pasta seguido de dois pontos.",
    xp: 20,
  },
  {
    id: 10,
    type: "mini-challenge",
    tag: "🎯 Missão 04",
    title: "DOMINANDO O TERMINAL",
    subtitle: "Navegue e organize pastas usando só a linha de comando",
    tasks: [
      "Abra o terminal (CMD, PowerShell ou Git Bash) e descubra a pasta atual (cd no CMD, pwd no Bash)",
      "Liste o conteúdo da pasta (dir no CMD, ls no Bash)",
      "Crie uma pasta chamada laboratorio com mkdir e entre nela com cd",
      "Dentro dela, crie as subpastas src e docs",
      "Volte um nível com cd .. e confirme onde você está",
      "Remova a pasta laboratorio inteira (rmdir /s no CMD, rm -r no Bash)",
    ],
    bonus: [
      "Repita o exercício no OUTRO terminal (se fez no CMD, faça no Git Bash) e compare os comandos",
      "Use Tab para completar os nomes das pastas em vez de digitar tudo",
      "Crie um arquivo vazio (type nul > nota.txt no CMD, touch nota.txt no Bash) e depois apague-o",
    ],
    xp: 40,
    nextHref: "/modulos/nextjs",
    nextLabel: "Módulo 02: Next.js Fundamentos →",
  },
];
