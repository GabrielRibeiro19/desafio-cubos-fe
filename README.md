# 🎬 Cubos Movies

Uma plataforma moderna para gerenciamento de catálogo de filmes, com funcionalidades completas de CRUD, filtros avançados e uma interface responsiva e elegante.

## 📋 Conteúdo

- Recursos
- Tecnologias
- Requisitos
- Instalação e Configuração
- Estrutura do Projeto
- Uso
- Funcionalidades Principais
- Tema Claro/Escuro

## 🚀 Recursos

- Autenticação de usuários (login/registro)
- CRUD completo de filmes
- Gerenciamento de gêneros
- Upload de imagens
- Filtros avançados de busca
- Tema claro/escuro
- Design responsivo
- Integração com API REST

## 🛠️ Tecnologias

- **Frontend**:
  - React 19
  - TypeScript
  - Vite
  - TailwindCSS 4
  - React Query
  - React Hook Form
  - Framer Motion
  - Zod
  - Axios

## 📌 Requisitos

- Node.js v18.0.0 ou superior
- npm ou yarn
- API Backend funcionando (verifique o repositório do backend)

## 💻 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/desafio-cubos-fe.git
cd desafio-cubos-fe
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo de ambiente para criar o seu próprio:

```bash
cp .env.example .env
```

Abra o arquivo .env e configure a URL da API:

```
VITE_API_URL=http://localhost:3333
```

### 4. Execute o projeto em modo de desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173` por padrão.

### 5. Para compilar o projeto para produção

```bash
npm run build
# ou
yarn build
```

Os arquivos compilados serão gerados na pasta `dist` e podem ser servidos por qualquer servidor web.

### 6. Prévia da versão de produção localmente

```bash
npm run preview
# ou
yarn preview
```

## 📁 Estrutura do Projeto

```
src/
├── assets/            # Imagens, ícones e recursos estáticos
├── components/        # Componentes reutilizáveis
├── contexts/          # Contextos React (Auth, Theme, etc.)
├── errors/            # Tratamento de erros personalizados
├── hooks/             # Custom hooks para API e lógica reutilizável
├── pages/             # Componentes de página
├── routes/            # Configuração de rotas
├── services/          # Serviços como API client
├── types/             # Definições de tipos TypeScript
├── App.tsx            # Componente principal
├── index.css          # Estilos globais e configurações do tema
└── main.tsx           # Ponto de entrada da aplicação
```

## 🖥️ Uso

### Autenticação

1. Ao acessar o aplicativo, você será redirecionado para a página de login.
2. Se não tiver uma conta, clique em "Criar conta" para se registrar.

### Navegação

Após o login, você será redirecionado para a página principal que exibe a lista de filmes.

- **Listar filmes**: Visualize todos os filmes disponíveis
- **Buscar filmes**: Use a barra de pesquisa para encontrar filmes por título
- **Filtrar filmes**: Clique em "Filtros" para refinar sua busca por gênero, duração, etc.
- **Adicionar filme**: Clique em "Adicionar Filme" para criar um novo registro
- **Ver detalhes**: Clique em um filme para ver informações detalhadas
- **Editar/Excluir**: Na página de detalhes, você pode editar ou excluir o filme

## ✨ Funcionalidades Principais

### Gerenciamento de filmes

- Cadastro completo com informações detalhadas
- Upload de imagens para pôster e banner
- Informações financeiras (orçamento, receita, lucro)
- Vinculação com gêneros
- Métricas (popularidade, votos, avaliação)

### Filtros avançados

- Busca por texto
- Filtro por gêneros
- Filtro por duração
- Filtro por data de lançamento

### Gerenciamento de gêneros

- Criação de novos gêneros
- Exclusão de gêneros existentes (com confirmação de segurança)

## 🌓 Tema Claro/Escuro

O aplicativo suporta dois temas visuais que podem ser alternados pelo botão na barra de navegação:

- **Tema Escuro** (padrão): Design escuro com cores contrastantes
- **Tema Claro**: Design com fundo claro e cores mais suaves

A preferência de tema é armazenada localmente, mantendo sua escolha entre sessões.

---

Desenvolvido como parte do desafio da Cubos Tecnologia.
