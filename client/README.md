# 🎓 Sistema Edtech - Frontend

## 🧭 Visão Geral do Sistema

O _Sistema Edtech_ é uma plataforma de gestão acadêmica desenvolvida para instituições de ensino superior. O sistema permite o cadastro e gerenciamento de matrículas de alunos em turmas online.

## 🚀 Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática para JavaScript
- **Vuetify 3** - Biblioteca de componentes Material Design
- **Pinia** - Gerenciamento de estado moderno para Vue
- **Vue Router** - Roteamento oficial do Vue
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para requisições à API

## 🧱 Arquitetura do Projeto

Este projeto adota o conceito de _Atomic Design_, uma abordagem que organiza os componentes da interface de forma hierárquica e modular:

- ⚛️ **Átomos**: Elementos mais simples da interface
- 🧬 **Moléculas**: Combinações de átomos
- 🧪 **Organismos**: Partes mais completas da interface
- 🧩 **Templates**: Estruturas que organizam organismos

### 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── atoms/          
│   ├── molecules/     
│   ├── organisms/     
│   └── templates/      
├── store/             
├── router/              
├── types/              
├── services/            
└── assets/             
```

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js 22+
- npm ou yarn

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto client:

```bash
# URL base da API backend
VITE_BASE_URL=http://localhost:3000/api
```

### 3. Executar em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint do código
npm run lint

```

## 🔐 Autenticação

O sistema possui autenticação baseada em tokens JWT. As rotas protegidas redirecionam automaticamente para login quando necessário.

### Fluxo de Autenticação:

1. Login com email/senha
   - **Email:** `admin@teste.com`
   - **Senha:** `123456`


