# Sistema Edtech API

API para sistema de gestão acadêmica da instituição Edtech, permitindo cadastro e gerenciamento de matrículas de alunos em turmas online.

## 🚀 Funcionalidades

-   **Autenticação de usuários** com JWT
-   **Login seguro** com bcrypt
-   **Renovação de tokens** automática

-   **Cadastro e gerenciamento de alunos** em turmas online

## 👤 Usuário Padrão

Para acessar o sistema, use:

-   **Email:** `admin@teste.com`
-   **Senha:** `123456`

## 📋 Requisitos para Execução

Para executar o projeto corretamente, é necessário garantir que as seguintes versões do Node.js e NPM estejam instaladas no ambiente:

-   **Node.js**: v22
-   **NPM**: v10

### Verificando as Versões Instaladas

Para verificar as versões instaladas do Node.js e NPM, execute os comandos abaixo no terminal:

```bash
node -v
npm -v
```

## ⚙️ Configuração de Execução

Antes de rodar o projeto, criar um arquivo `.env` no diretório na raiz do projeto (server) e dentro dele colocar o seguinte conteúdo ajustando as variáveis de acordo com seu ambiente local:

### Local

```env
PORT=3000
API_BASE=/api
DATABASE_URL="postgresql://username:password@localhost:5432/education"
JWT_SECRET="your-secret-key"
```

## 🗄️ Configuração do Banco de Dados

### Executar Migrações

```bash
# Aplicar migrações do banco de dados
npx prisma migrate dev

# Ou resetar completamente o banco
npx prisma migrate reset
```

### Criar Usuário Padrão

```bash
# Executar seed para criar usuário padrão
npm run db:seed
```

## 🚀 Rodando o Projeto

```bash
# Instalar dependências
npm install

# Executar migrações e seed
npx prisma migrate dev
npm run db:seed

# Iniciar o servidor
npm run dev
```



## 📚 Documentação da API

Para acessar a documentação da API:

1. Iniciar o servidor com o comando `npm run dev`
2. Acessar a seguinte URL: [http://localhost:3000/api/api-docs](http://localhost:3000/api/api-docs)
    - **OBS:** caso estiver usando uma porta diferente, deve ser alterada na URL

## 📝 Scripts Disponíveis

-   `npm run dev` - Iniciar servidor em modo desenvolvimento
-   `npm run test` - Executar testes
-   `npm run lint` - Verificar código com ESLint
-   `npm run db:seed` - Executar seed do banco de dados
