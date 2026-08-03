# Gabarito — Módulo 01 (Infraestrutura e Nivelamento)

Respostas dos exercícios das Aulas 01 (P1–P3), 02, 03 e 04. Uso do professor.
Cada aula tem 3 exercícios: **Quiz**, **Preencher lacuna** e **Missão prática**
(a missão é aberta — abaixo vão soluções/comandos de referência).

---

## Aula 01 · P1 — O que é Node.js  (`/modulos/infra/node-1`)

**Quiz — "Node.js é uma linguagem mais moderna que o JavaScript?"**
✅ **Não — Node.js é um runtime que executa JavaScript fora do navegador.**
Node = ambiente de execução (V8 + libuv + APIs de sistema). A linguagem continua sendo JavaScript.

**Preencher lacuna — comando que executa `ola.js` com o Node**
✅ `node ola.js`

**Missão 01 — Primeiro contato (referência):**
```bash
node -v && npm -v          # verifica a instalação
# ola.js:
#   console.log("Web On Fire! 🔥");
node ola.js                # imprime a mensagem
npm init -y                # gera o package.json
# em package.json: "scripts": { "ola": "node ola.js" }
npm run ola                # roda o script
npm install cowsay         # cria node_modules/
```
Bônus: `arquivos.js` com `fs/promises` (writeFile/readFile de um `diario.txt`); `require("os")` → `os.platform()`, `os.cpus().length`; `npx cowsay "Node on fire!"` (npx executa um pacote sem instalar globalmente).

---

## Aula 01 · P2 — Como o Node funciona  (`/modulos/infra/node-2`)

**Quiz 1 — "O que aparece ao rodar `node garcom.js`?"**
✅ **1, 2, 3** — o `setTimeout` delega para a "cozinha", o código síncrono segue (imprime 2) e só depois o event loop entrega o 3. `0ms` não significa "agora".

**Preencher lacuna — palavra que pausa a função async sem travar**
✅ `await`

**Quiz 2 — "Qual tarefa TRAVA o event loop?"**
✅ **Um `for` que calcula números primos por 30 segundos** (CPU-bound: ocupa a única thread; não há I/O para delegar). Ler arquivo/esperar banco/receber conexões são I/O — não travam.

**Missão 02 — Laboratório do loop (referência):**
```js
// garcom.js
console.log(1);
setTimeout(() => console.log(3), 0);
console.log(2);          // saída: 1, 2, 3
```
- Dois `setTimeout(…,0)` → executam na **ordem de agendamento** (1, 2, 3, 3...).
- `node -e "console.log('x'.repeat(5000000))" > grande.txt` cria o arquivo grande.
- `readFileSync` **bloqueia** a thread; `await readFile` (de `fs/promises`) não — meça com `console.time`/`console.timeEnd`.
- Um `while` de ~3s **antes** de um `setTimeout` atrasa a entrega do callback (prova o bloqueio).
- Bônus: `process.nextTick` fura a fila (roda antes dos timers e do `setImmediate`).

---

## Aula 01 · P3 — Node no mundo real  (`/modulos/infra/node-3`)

**Quiz — "Em qual produto o Node seria a escolha mais questionável?"**
✅ **Serviço que converte vídeos 4K** — conversão de vídeo é CPU-bound (ocuparia a thread por minutos). Melhor Go/Rust ou fila com workers. API de delivery, chat em tempo real e agregador de APIs são I/O → pontos fortes do Node.

**Preencher lacuna — comando que sobe o servidor de desenvolvimento (Next.js)**
✅ `npm run dev`

**Missão 03 — Servidor na unha (referência):**
```js
// servidor.js
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url === "/alunos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(["Ana", "Bruno", "Carla"]));
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "on fire" }));
});

server.listen(3000, () => console.log("http://localhost:3000"));
```
Observação didática: sem roteador, sem hot reload, sem componentes — tudo manual (é o que o Next.js resolve). Bônus: responder HTML com `Content-Type: text/html`; usar `nodemon servidor.js` para reiniciar a cada save.

---

## Aula 02 — Tipagem Estática (TypeScript)  (`/modulos/infra/typescript`)

**Quiz — `type Status = "ativo" | "inativo"; const s: Status = "Ativo";`**
✅ **Erro de compilação, antes mesmo de rodar.** Tipos literais são exatos: `"Ativo" ≠ "ativo"`. O compilador barra: *Type '"Ativo"' is not assignable to type 'Status'*.

**Preencher lacuna — palavra-chave que declara o contrato de forma de um objeto**
✅ `interface`

**Missão TS — Contratos de aço (referência):**
```ts
interface Aluno {
  nome: string;
  email: string;
  xp: number;
  badges: string[];
}

type Dificuldade = "facil" | "medio" | "dificil";

interface Atividade {
  id: string | number;
  titulo: string;
  dificuldade: Dificuldade;
  prazo?: string;          // opcional
}

function ganharXP(aluno: Aluno, pontos: number): Aluno {
  return { ...aluno, xp: aluno.xp + pontos };   // retorna um NOVO objeto
}
```
Erros propositais: `xp: "dez"` → *Type 'string' is not assignable to type 'number'*; `dificuldade: "media"` → não pertence à union.
Bônus: `function atualizarAluno(a: Aluno, mudancas: Partial<Aluno>): Aluno { return { ...a, ...mudancas }; }`; `function primeiro<T>(lista: T[]): T { return lista[0]; }`.

---

## Aula 03 — Git & GitHub  (`/modulos/infra/git`)

**Quiz — "Registrar só 1 de 3 arquivos editados no próximo commit"**
✅ **`git add arquivo.ts` e depois `git commit -m "..."`** — o `add` seleciona o que entra na foto (staging area); o commit fotografa só o que foi preparado.

**Preencher lacuna — comando que registra a foto das mudanças preparadas**
✅ `git commit -m`  (ex.: `git commit -m "feat: adiciona pagina de perfil"`)

**Missão Git — Máquina do tempo (referência):**
```bash
git config --global user.name "Seu Nome"
git config --global user.email "voce@email.com"

mkdir lab-git && cd lab-git
git init
echo "# Lab Git" > README.md
git add README.md
git commit -m "chore: primeiro commit"

git remote add origin https://github.com/usuario/lab-git.git
git push -u origin main

git checkout -b feature/sobre
echo "# Sobre" > sobre.md
git add sobre.md && git commit -m "feat: pagina sobre"
git push origin feature/sobre
# → abrir o Pull Request no GitHub e fazer o merge pela interface
```
Conflito: alterar a **mesma linha** do README na `main` e numa branch nova, fazer `git merge` e resolver (editar o arquivo removendo os marcadores `<<<<<<`, `======`, `>>>>>>`, depois `git add` + `git commit`).
Bônus: `git log --oneline --graph --all`.

---

## Aula 04 — Terminal: CMD & Bash  (`/modulos/infra/terminal`)

**Quiz — "No Git Bash (Windows), como listar os arquivos da pasta atual?"**
✅ **`ls`** — o Git Bash é um shell Unix, então usa `ls` mesmo rodando no Windows (`dir` é do CMD).

**Preencher lacuna — voltar para a pasta anterior (um nível acima)**
✅ `cd ..`  (igual no CMD e no Bash)

**Missão 04 — Dominando o terminal (referência):**

| Passo | CMD (Windows) | Bash (Unix / Git Bash) |
|---|---|---|
| Pasta atual | `cd` | `pwd` |
| Listar | `dir` | `ls` |
| Criar pasta e entrar | `mkdir laboratorio` → `cd laboratorio` | `mkdir laboratorio` → `cd laboratorio` |
| Subpastas src e docs | `mkdir src` e `mkdir docs` | `mkdir src docs` |
| Voltar um nível | `cd ..` | `cd ..` |
| Remover a pasta inteira | `rmdir /s laboratorio` | `rm -r laboratorio` |

Bônus: criar arquivo vazio → CMD `type nul > nota.txt`, Bash `touch nota.txt`; remover → CMD `del nota.txt`, Bash `rm nota.txt`; usar **Tab** para completar nomes.

---

### Resumo rápido das respostas objetivas

| Aula | Quiz (correta) | Lacuna |
|---|---|---|
| 01·P1 | Runtime que executa JS fora do navegador | `node ola.js` |
| 01·P2 | 1, 2, 3 · (final) `for` de primos por 30s | `await` |
| 01·P3 | Conversão de vídeo 4K (CPU-bound) | `npm run dev` |
| 02 | Erro de compilação | `interface` |
| 03 | `git add` depois `git commit -m` | `git commit -m` |
| 04 | `ls` | `cd ..` |
