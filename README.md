# VEXA – Gurias

> Aplicação web em React que une informação e conscientização sobre violência contra a mulher a um catálogo de moda.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)
![Testes](https://img.shields.io/badge/testes-Vitest-6E9F18?logo=vitest&logoColor=white)

## Sumário

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts disponíveis](#scripts-disponíveis)
- [Rotas](#rotas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Banco de dados (Supabase)](#banco-de-dados-supabase)
- [Testes](#testes)
- [Autoras](#autoras)
- [Licença](#licença)

## Sobre o projeto

O VEXA tem dois "lados":

- **Lado A** – páginas informativas sobre violência contra a mulher: notícias, dashboard de dados, canais de ajuda, conteúdos e formulário de contato. O acesso a partir do catálogo passa por login/cadastro.
- **Lado B** – catálogo de moda (roupas, acessórios, nova coleção, contato e sobre) com busca, filtro por categoria e favoritos.

Este repositório é a unificação de dois projetos anteriores (`react-conteudo-isa-unificacao` e `react-UnificacaoAna`).

## Funcionalidades

- Navegação entre Lado A e Lado B, com **cadastro, login, logout e redefinição de senha por e-mail** (Supabase Auth).
- **Página de perfil** (`/perfil`) para ver e editar o nome da conta.
- **Notícias** com busca por texto, filtro por categoria e favoritos.
- **Catálogo de roupas** com busca, filtro por categoria, favoritos e carrossel.
- **Dashboard** com análise de dados sobre feminicídio no Brasil.
- **Canais de ajuda**, passo a passo de denúncia, diretório de serviços e orientações de proteção.
- **Formulário de contato** com envio de e-mail via EmailJS.
- **Favoritos de notícias salvos no banco**, ligados à conta (seguem a usuária entre sessões e dispositivos). Os favoritos de roupas (Lado B) continuam no `localStorage`.

## Tecnologias

| Área | Ferramentas |
| --- | --- |
| Interface | React 19, React Router 7, lucide-react, react-icons |
| Build | Vite 8 |
| Contas e banco | Supabase (Auth + PostgreSQL com RLS) – `@supabase/supabase-js` |
| E-mail | EmailJS (`@emailjs/browser`) |
| Qualidade | ESLint 10 |
| Testes | Vitest, Testing Library, jsdom |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (instalado junto com o Node.js)

## Instalação e execução

```bash
# 1. Instale as dependências
npm install

# 2. Configure o banco (veja "Banco de dados (Supabase)" abaixo) e crie o .env
cp .env.example .env

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

Para gerar e visualizar a versão de produção:

```bash
npm run build
npm run preview
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Build de produção na pasta `dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run lint` | Verifica o código com ESLint |
| `npm test` | Executa todos os testes uma vez |
| `npm run test:watch` | Executa os testes em modo observação |

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Redireciona para `/lado-b` |
| `/lado-a` | Página inicial do Lado A (proposta e contato) |
| `/conteudos` | Notícias |
| `/sobreConteudos` | Sobre / conteúdos |
| `/canais-ajuda` | Canais de ajuda e rede de atendimento |
| `/cadastro` | Criar conta (ao concluir, vai para `/lado-a`) |
| `/entrar` | Login e pedido de link para redefinir a senha (ao concluir, vai para `/lado-a` ou para a página que exigiu login) |
| `/redefinir-senha` | Abre pelo link do e-mail e define a nova senha |
| `/perfil` | Perfil da usuária (**exige login**; sem sessão redireciona para `/entrar`) |
| `/lado-b` | Catálogo de roupas |
| `/lado-b/acessorios` | Acessórios |
| `/lado-b/nova-colecao` | Nova coleção |
| `/lado-b/contato` | Contato do Lado B |
| `/lado-b/sobre` | Sobre nós do Lado B |
| `/lado-b/dashboard` | Dashboard de dados |
| `/dashboard`, `/contato` | Atalhos que redirecionam para as rotas do Lado B |
| qualquer outra | Redireciona para `/lado-a` |

## Estrutura do projeto

```text
.
├── public/assets/        # Imagens das roupas referenciadas em roupas.json
├── src/
│   ├── App.jsx           # Rotas, favoritos de roupas e de notícias
│   ├── context/          # AuthProvider / useAuth (sessão)
│   ├── services/         # Acesso ao Supabase: auth, perfil, favoritos
│   ├── lib/supabase.js   # Cliente Supabase (lê as variáveis VITE_*)
│   ├── hooks/            # useFavoritosNoticias
│   ├── main.jsx          # Ponto de entrada (BrowserRouter)
│   ├── pages/            # Uma página por rota
│   ├── components/       # Componentes reutilizáveis
│   ├── data/             # roupas.json e conteudos.json
│   ├── assets/           # CSS, imagens e fontes
│   └── test/             # Configuração e utilitários de teste
├── supabase/migrations/  # SQL das tabelas, triggers e políticas RLS
├── .env.example
├── index.html
├── vite.config.js        # Vite + configuração do Vitest
├── eslint.config.js
└── package.json
```

## Banco de dados (Supabase)

As contas, os perfis e os favoritos de notícias ficam no **Supabase** (Auth + PostgreSQL).
As senhas são tratadas pelo Supabase Auth (hash no servidor); o site nunca as armazena.

### Configuração (uma vez)

1. Crie um projeto em <https://supabase.com>.
2. No **SQL Editor**, cole e execute `supabase/migrations/20261021000000_vexa_profiles_favorites.sql`
   (ou rode `supabase db push` se usar a CLI). Ele cria:
   - `profiles` (`id` → `auth.users`, `name`, `created_at`, `updated_at`), criada automaticamente por trigger no cadastro;
   - `favorites` (`user_id`, `news_id`, `created_at`) com `unique (user_id, news_id)`;
   - RLS ligada nas duas tabelas: cada usuária só lê/insere/remove (favoritos) ou lê/edita (perfil) as **próprias** linhas; o acesso `anon` é revogado.
3. Em **Project Settings > API**, copie a *Project URL* e a chave *anon/publishable*.
4. Copie `.env.example` para `.env` e preencha:

   | Variável | Conteúdo |
   | --- | --- |
   | `VITE_SUPABASE_URL` | URL do projeto |
   | `VITE_SUPABASE_ANON_KEY` | chave pública anon/publishable (**nunca** a `service_role`) |

5. Em **Authentication > URL Configuration**, defina *Site URL* (ex.: `http://localhost:5173`) e adicione em *Redirect URLs*:
   `http://localhost:5173/redefinir-senha`, `http://localhost:5173/entrar` e `http://localhost:5173/lado-a`
   (e os equivalentes do domínio de produção).
6. Em **Authentication > Providers**, habilite *Email*. Opcional: *Google* e *GitHub* para os botões sociais do cadastro
   (sem o provedor ativo, o clique mostra um erro). Se *Confirm email* estiver ligado, o cadastro pede a confirmação por e-mail antes do primeiro login.

Sem as variáveis, o site abre normalmente, mas login, cadastro e favoritos de notícias avisam que o serviço não está configurado.

### Observações

- As notícias continuam em `src/data/conteudos.json`; `favorites.news_id` guarda o `id` de cada notícia.
  **Nunca renumere nem reutilize ids** (o teste de integridade garante a unicidade).
- O e-mail não é editável no perfil (mudar o e-mail exige o fluxo de confirmação do provedor e não faz parte desta versão).
- Roupas (Lado B): favoritos ainda em `localStorage` (chave `favoritos`), separados dos de notícias.
- O formulário de contato usa o [EmailJS](https://www.emailjs.com/); a configuração está em `src/components/ProfileSection.jsx`.

## Responsividade

O site se adapta a celular, tablet e desktop. Os ajustes de tela pequena ficam em
`src/assets/css/responsive.css`, importado por último em `App.jsx` para complementar
os estilos de cada página (acima de 1024px nada muda). Principais pontos de quebra:
1024, 900, 768, 640/600, 480 e 360px. Ao criar uma página nova, confira-a nessas larguras.

## Testes

```bash
npm test
```

A suíte cobre:

- rotas, redirecionamentos e navegação entre os lados;
- cadastro, login, redefinição de senha, rota protegida e perfil (serviços Supabase mockados);
- busca, filtros e favoritos (notícias via serviço mockado; roupas, inclusive `localStorage` corrompido);
- componentes: footer, sidebar, header e formulário de contato (envio mockado);
- integridade dos dados: ids únicos, campos obrigatórios, imagens existentes e imports com maiúsculas/minúsculas corretas (evita falhas em Linux/CI).

## Autoras

- **Ana Clara**
- **Isabelle**

## Licença

Ainda não definida. Antes de publicar ou reutilizar o código, defina uma licença para o projeto.
