# 🎵 Coleção Virtual 💿

Bem-vindo ao **Coleção Virtual**! 🚀 Este projeto é o resultado do trainee de 2025.1 da byron.solutions, carinhosamente desenvolvido por Davi da Silva Lorena e Rafael Lemes Scarpel. 🧑‍💻👩‍💻

Nossa aplicação web foi criada para você organizar, avaliar e reviver cada batida da sua coleção musical, do seu jeito! ✨

## ✨ Funcionalidades Incríveis

A plataforma oferece um conjunto completo de ferramentas para gerenciar seus tesouros musicais:

### 📀 Álbuns
* **Listagem de Álbuns**: Veja todos os seus álbuns em um só lugar, de forma organizada e fácil de navegar. 🎶
* **Detalhes do Álbum**: Mergulhe fundo nas informações de cada álbum, incluindo o título, artista, gênero, ano de lançamento e uma imagem de capa deslumbrante. 🖼️
* **Criação de Álbum**: Adicione novos álbuns à sua coleção com apenas alguns cliques, preenchendo detalhes essenciais. ➕
* **Edição de Álbum**: Mantenha suas informações sempre atualizadas, editando qualquer dado de um álbum existente. ✏️
* **Exclusão de Álbum**: Remova álbuns que não fazem mais parte da sua vibe. 🗑️

### ⭐️ Avaliações
* **Listagem de Avaliações**: Veja o que você (ou outros) achou de cada álbum, com todas as avaliações agrupadas. 📝
* **Criação de Avaliação**: Compartilhe sua opinião sobre um álbum adicionando uma nova avaliação com título, data, sua nota (de 0 a 10) e um comentário. ✍️
* **Edição de Avaliação**: Mudou de ideia? Edite suas avaliações quando quiser! 🔄
* **Exclusão de Avaliação**: Remova avaliações que não são mais relevantes. ❌
* **Cálculo de Nota Média**: Veja rapidamente a qualidade geral de um álbum através de sua nota média ponderada. 📊

## 🛠️ Tecnologias Utilizadas

Este projeto robusto é dividido em duas partes essenciais: o **Backend** (API) e o **Frontend** (Interface do Usuário), construídos com as seguintes tecnologias:

### Backend 🖥️
* **Node.js**: O motor JavaScript que impulsiona nossa API.
* **Express**: Um framework web minimalista e flexível para Node.js, perfeito para construir APIs.
* **Prisma**: Nosso ORM moderno e poderoso para uma interação suave com o banco de dados.
* **PostgreSQL**: O coração do nosso banco de dados relacional, confiável e escalável.
* **Zod**: Para garantir que todos os dados que chegam à nossa API sejam validados com precisão.
* **`express-async-errors`**: Para um tratamento de erros elegante e eficiente em rotas assíncronas.
* **CORS**: Gerenciando as permissões para que frontend e backend conversem harmoniosamente.
* **TypeScript**: Adiciona tipagem estática ao JavaScript, tornando o código mais robusto e fácil de manter.

### Frontend 🌐
* **Next.js 15.4.2**: O framework React de ponta que nos permite construir interfaces rápidas e dinâmicas.
* **React 19.1.0**: A biblioteca essencial para criar componentes interativos na nossa UI.
* **Axios**: O cliente HTTP que facilita nossas requisições para a API.
* **Tailwind CSS 4**: Nosso kit de ferramentas CSS utilitário para estilizar o app de forma ágil e consistente.
* **Lucide React**: Ícones bonitos e funcionais para aprimorar a experiência visual.
* **Radix UI**: Componentes de UI acessíveis e altamente personalizáveis para uma experiência de usuário impecável.

## 🚀 Começando

Siga estes passos simples para colocar o **Coleção Virtual** em funcionamento na sua máquina local:

### Pré-requisitos 📋
Certifique-se de ter os seguintes softwares instalados em seu ambiente:
* [Node.js](https://nodejs.org/) (versão 18.x ou superior)
* npm ou [Yarn](https://yarnpkg.com/) (seu gerenciador de pacotes preferido)
* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (essenciais para rodar o banco de dados PostgreSQL)

### Configuração do Backend ⚙️

1.  **Navegue até o diretório `back`**:
    ```bash
    cd andreunderstars/projeto-final-trainee-2025/projeto-final-trainee-2025-develop/back
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Variáveis de Ambiente 🔑**:
    Crie um arquivo `.env` na raiz do diretório `back`. Este arquivo conterá a string de conexão com o banco de dados PostgreSQL. Você pode copiar o conteúdo do arquivo `.env-example`:
    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/colecaovirtual?schema=public"
    ```

4.  **Configuração do Banco de Dados com Docker Compose 🐳**:
    Utilizamos Docker Compose para facilitar a execução da instância do PostgreSQL. No diretório `back`, execute:
    ```bash
    docker-compose up -d
    ```
    Isso iniciará um contêiner PostgreSQL na porta `5432`.

5.  **Executar Migrações do Prisma ⬆️**:
    Com o banco de dados em execução, aplique as migrações do Prisma para criar as tabelas necessárias e o esquema do banco de dados:
    ```bash
    npx prisma migrate dev --name init
    ```
    Certifique-se de que as migrações `20250724224200_create_albums_table`, `20250728220611_create_tables` e `20250728221135_add_title_avaliacao` foram aplicadas com sucesso.

6.  **Iniciar o Servidor Backend ▶️**:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Seu servidor backend estará pronto e ouvindo em `http://localhost:3333`.

#### Endpoints da API (Backend) 🌐

A API expõe os seguintes endpoints, permitindo total controle sobre seus álbuns e avaliações:

**Álbuns**
* **`POST /api/albums`**: Crie um novo álbum na sua coleção.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "title": "Buiikikaesu",
            "artist": "Maximum the Hormone",
            "gender":"Rock/metal",
            "releaseYear": 2005,
            "imageUrl": "./buiikisu.png"
        }
        ```
       
* **`GET /api/albums`**: Liste todos os álbuns cadastrados.
* **`GET /api/albums/:id`**: Obtenha os detalhes de um álbum específico, incluindo suas avaliações.
* **`PUT /api/albums/:id`**: Atualize as informações de um álbum existente.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "imageUrl": "./buiikikaesu.png"
        }
        ```
       
* **`DELETE /api/albums/:id`**: Remova um álbum da coleção.

**Avaliações (Reviews)**
* **`POST /api/albums/:albumId/reviews`**: Adicione uma nova avaliação a um álbum.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "title": "Avaliação",
            "score": 10,
            "date": "24/12/2024",
            "comment": "Músicas boas e pesadas! Heavy metal"
        }
        ```
       
* **`GET /api/albums/:albumId/reviews`**: Visualize todas as avaliações de um álbum.
* **`GET /api/albums/:albumId/reviews/:avaliacaoId`**: Obtenha os detalhes de uma avaliação específica.
* **`PUT /api/albums/:albumId/reviews/:avaliacaoId`**: Edite uma avaliação existente.
    * **Corpo da Requisição (JSON)**:
        ```json
        {
            "title": "Avaliando Buiikisu"
        }
        ```
       
* **`DELETE /api/albums/:albumId/reviews/:avaliacaoId`**: Exclua uma avaliação.

### Configuração do Frontend 🎨

1.  **Navegue até o diretório `front`**:
    ```bash
    cd andreunderstars/projeto-final-trainee-2025/projeto-final-trainee-2025-develop/front
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Iniciar o Servidor Frontend ▶️**:
    ```bash
    npm run dev -- --turbopack
    # ou
    yarn dev --turbopack
    # ou
    pnpm dev --turbopack
    # ou
    bun dev --turbopack
    ```
    Sua aplicação frontend estará disponível em `http://localhost:3000`. 🚀

## 📂 Estrutura do Projeto

O repositório está logicamente dividido em duas áreas principais: `back` para a API e `front` para a interface do usuário, seguindo uma arquitetura de projeto fullstack:
````
projeto-final-trainee-2025/
├── back/                      \# 🧠 Contém todo o código do backend (API).
│   ├── prisma/                \# 📚 Definição do esquema do banco de dados e controle de migrações.
│   │   ├── migrations/        \# Histórico das alterações do banco de dados.
│   │   └── schema.prisma      \# O blueprint dos nossos modelos de dados (Album, Song, Avaliacao).
│   ├── src/                   \# 🚀 Código fonte principal do backend.
│   │   ├── controllers/       \# A inteligência de negócio por trás de cada ação.
│   │   ├── database/          \# Conexão e configuração do Prisma Client.
│   │   ├── middlewares/       \# Camada de interceptação e tratamento de erros.
│   │   ├── routes/            \# O mapa das nossas APIs, definindo os caminhos.
│   │   ├── utils/             \# Ferramentas e classes auxiliares (como AppError).
│   │   └── server.ts          \# Onde o servidor ganha vida\! 🌐
│   ├── .env-example           \# Guia para as variáveis de ambiente essenciais.
│   ├── docker-compose.yml     \# Orquestrando o PostgreSQL com Docker. 🐳
│   ├── package.json           \# Dependências e scripts para o backend.
│   └── tsconfig.json          \# Configurações do TypeScript para o backend.
├── front/                     \# 🎨 Contém todo o código do frontend (aplicação web).
│   ├── public/                \# 🖼️ Assets estáticos: imagens, ícones e muito mais.
│   ├── src/                   \# 💻 Código fonte principal do frontend.
│   │   ├── app/               \# Estrutura de páginas e layout do Next.js.
│   │   │   ├── albuns/        \# Página principal para visualizar todos os álbuns.
│   │   │   │   └── [id]/      \# Página dedicada aos detalhes de um álbum específico.
│   │   │   ├── avaliacoes/    \# Página para gerenciar avaliações de um álbum.
│   │   │   ├── components/    \# Blocos de construção reutilizáveis da nossa interface (Header, Footer, Cards, Modals).
│   │   │   ├── globals.css    \# Estilos universais e a magia do Tailwind CSS. ✨
│   │   │   └── layout.tsx     \# O esqueleto que sustenta toda a aplicação.
│   │   ├── lib/               \# Funções de utilidade e helpers (ex: `cn` para classes CSS)
│   │   └── utils/             \# Configurações do Axios para chamadas à API.
│   ├── components.json        \# Esquema de configuração para componentes Shadcn UI.
│   ├── next.config.ts         \# Ajustes e otimizações do Next.js.
│   ├── package.json           \# Dependências e scripts para o frontend.
│   ├── postcss.config.mjs     \# Configuração do PostCSS para processamento de CSS.
│   └── tsconfig.json          \# Configurações do TypeScript para o frontend.
└── README.md                  \# Você está aqui\! 🌟

````
## 🤝 Contribuidores

Este projeto foi carinhosamente desenvolvido por:

* [Davi da Silva Lorena](https://github.com/DaviLorena)
* [Rafael Lemes Scarpel](https://github.com/RafaelLemes)

Sinta-se à vontade para explorar, aprender e, quem sabe, contribuir! 😊
