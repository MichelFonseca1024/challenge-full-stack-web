## Decisão da Arquitetura Utilizada

### Arquitetura Frontend

#### Atomic Design

Optei por implementar o **Atomic Design** porque é uma arquitetura que promove a reutilização de codigo, organização bem definida e de facil manutenção, organizando os componentes em:

-   **Atoms**: Componentes básicos reutilizáveis
-   **Molecules**: Composições de atoms
-   **Organisms**: Seções complexas
-   **Templates**: Layouts de página

#### Tecnologias usadas:

-   **Vue 3** com Composition API
-   **Pinia** para gerenciamento de estado centralizado
-   **Vue Router** para navegação entre páginas
-   **Vuetify 3** para componentes UI
-   **TypeScript** para tipagem

### Arquitetura Backend

#### API REST

O backend implementa uma **arquitetura REST** com as seguintes características:

-   **Node.js** como runtime JavaScript
-   **Express.js** como framework web
-   **Estrutura MVC** (Model-View-Controller) para organização do código
-   **Middleware de autenticação** JWT para segurança
-   **Validação de dados** centralizada nos controllers
-   **Tratamento de erros** padronizado

#### Endpoints Principais

```
POST /auth/login              # Autenticação de usuários
POST /auth/refresh-token      # Renovação de tokens

GET    /students              # Listar alunos (com paginação e busca)
POST   /students              # Criar novo aluno
GET    /students/:id          # Buscar aluno por ID
PUT    /students/:id          # Atualizar dados do aluno
DELETE /students/:id          # Excluir aluno
```

#### Padrões de Resposta

-   **Sucesso**: Status 200/201 com dados no formato `{ data: {...}, message?: string }`
-   **Erro**: Status 4xx/5xx com formato `{ error: { message: string } }`
-   **Paginação**: Metadados incluídos em `{ data: {...}, pagination: {...} }`

#### Segurança

-   **JWT Tokens** para autenticação
-   **Middleware de autorização** em rotas protegidas
-   **Validação de entrada** para prevenir SQL injection
-   **CORS configurado** para requisições cross-origin

#### Estrutura Arquitetural

**Repository**

-   Abstração para acesso a dados com métodos padronizados (CRUD)

**Controllers**

-   Controladores REST
-   Validação via DTOs e resposta formatada

**Config**

-   Configurações centralizadas de banco, Swagger
-   Variáveis de ambiente por contexto

**Docs**

-   Swagger/OpenAPI para documentação automática

**Data Transfer Objects (DTOs)**

-   Validação e sanitização de entrada

**Middleware**

-   Autenticação/Autorização, Validação, Manipulador de Erros

**Helpers**

-   Funções utilitárias reutilizáveis

**Routes**

-   Roteamento modular por feature

## Lista de Bibliotecas de Terceiros Utilizadas

### Frontend

-   **Vue 3** - Framework reativo
-   **Vuetify 3** - Biblioteca de componentes Material Design
-   **Pinia** - Store para gerenciamento de estado
-   **Vue Router** - Roteamento SPA
-   **TypeScript** - Tipagem estática
-   **SweetAlert2** - Notificações toast

### Backend

-   **Express** - Estrutura para API REST
-   **JWT** - Autenticação de usuários
-   **Prisma** - ORM para gerenciamento do banco de dados
-   **bcrypt** - Hashing de senhas
-   **Swagger** - Documentação da API

## Melhoraria se Tivesse Mais Tempo

1. Testes unitários
2. Testes de integração
3. Testes end-to-end

## Requisitos obrigatórios que não foram entregues

-   Testes de unidade
-   Documentação detalhada da arquitetura de solução
