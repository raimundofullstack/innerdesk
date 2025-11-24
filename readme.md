# InnerDesk API 🎫

Uma API REST moderna para gerenciamento de help desk e tickets, construída com TypeScript, Express e PostgreSQL. Este projeto demonstra padrões de arquitetura de nível empresarial incluindo controle de acesso baseado em funções, autenticação JWT e migrações com TypeORM.

## 🚀 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

**Stack Principal:**

- **TypeScript** - JavaScript com tipagem estática
- **Express.js** - Framework web minimalista e rápido
- **PostgreSQL** - Banco de dados relacional robusto
- **TypeORM** - ORM moderno com suporte a migrações
- **JWT** - Autenticação segura
- **Zod** - Validação de schemas
- **Bcrypt** - Hash de senhas

## 📋 Funcionalidades Implementadas

- ✅ Autenticação de usuários com JWT
- ✅ Controle de acesso baseado em funções (Admin, Agente, Cliente)
- ✅ Sistema de gerenciamento de tickets
- ✅ Validação de requisições com Zod
- ✅ Migrações de banco de dados com TypeORM
- ✅ Middleware de tratamento de erros
- ✅ CORS habilitado
- ✅ Design de API RESTful

## 🚧 Funcionalidades em Desenvolvimento

- ⏳ **Testes Automatizados** - Testes unitários com Jest e Supertest
- ⏳ **Controle Administrativo** - Gerenciamento completo de usuários pelo Admin
- ⏳ **Exclusão de Tickets** - Apenas Admin pode deletar tickets
- ⏳ **Sistema de Comentários** - Comentários em tickets
- ⏳ **Upload de Anexos** - Anexos de arquivos com armazenamento no AWS S3
- ⏳ **Docker** - Containerização da aplicação

## 🏗️ Estrutura do Projeto

```
src/
├── app.ts                    # Configuração do Express
├── server.ts                 # Ponto de entrada do servidor
├── config/
│   └── data-source.ts        # Configuração do TypeORM
├── middlewares/
│   ├── auth.ts               # Autenticação JWT
│   ├── roles.ts              # Autorização baseada em funções
│   ├── validate.ts           # Validação de requisições
│   └── error-handler.ts      # Tratamento global de erros
├── modules/
│   └── tickets/              # Módulo de tickets
│       ├── ticket.entity.ts
│       ├── ticket.service.ts
│       ├── ticket.controller.ts
|       ├── ticket.repository.ts
│       ├── ticket.routes.ts
│       ├── ticket.mapper.ts
│       └── validation/
│   ├── users/                # Módulo de usuários
│   │   ├── user.entity.ts
│   │   ├── user.service.ts
|   |   ├── user.repository.ts
│   │   ├── user.controller.ts
│   │   ├── user.routes.ts
│   │   └── validation/
├── migrations/               # Migrações do banco de dados
└── routes/
    └── index.ts              # Agregador de rotas
```

## 🔧 Instalação

```bash
# Clone o repositório
git clone https://github.com/raimundofullstack/innerdesk.git
cd innerdesk

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do banco de dados
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=sua_senha
DB_NAME=innerdesk
PORT=3000
JWT_SECRET=seu_jwt_secret
```

## 🗄️ Configuração do Banco de Dados

```bash
# Certifique-se de que o PostgreSQL está rodando e crie o banco de dados
createdb innerdesk

# Execute as migrações
npm run migration:run
```

## 🚀 Executando a Aplicação

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📡 Endpoints da API

### Autenticação

- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário

### Usuários (Protegido)

- `GET /api/users` - Listar todos os usuários (Apenas Admin)

### Tickets (Protegido)

- `GET /api/tickets` - Listar tickets (filtrado por função)
- `POST /api/tickets` - Criar novo ticket
- `PATCH /api/tickets/:id/status` - Atualizar status do ticket
- `PATCH /api/tickets/:id/assign` - Atribuir um agent ao ticket
- `DELETE /api/tickets/:id` - Deletar ticket (Em desenvolvimento - apenas Admin)

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. Inclua o token no header Authorization:

```
Authorization: Bearer <seu-jwt-token>
```

## 👥 Funções de Usuário

- **Admin** - Acesso completo a todos os recursos
- **Agente** - Pode gerenciar tickets atribuídos
- **Cliente** - Pode criar e visualizar seus próprios tickets

## 🛠️ Migrações do Banco de Dados

```bash
# Gerar uma nova migração
npm run migration:generate

# Executar migrações pendentes
npm run migration:run

# Reverter última migração
npm run migration:revert
```

## 🏛️ Destaques da Arquitetura

- **Design Modular** - Estrutura de pastas baseada em funcionalidades
- **Injeção de Dependências** - Camada de serviço limpa
- **Camada de Validação** - Schemas Zod para validação type-safe
- **Padrão Mapper** - DTOs para respostas da API
- **Pipeline de Middlewares** - Autenticação, autorização e validação
- **Tratamento de Erros** - Middleware centralizado de tratamento de erros

## 🎯 Roadmap

### Próximas Implementações

1. **Testes Automatizados**

   - Finalizar testes unitários para services
   - Finalizar testes de integração para endpoints

2. **Gerenciamento Avançado de Usuários**

   - Admin pode ativar/desativar usuários
   - Admin pode alterar funções de usuários
   - Logs de atividades administrativas

3. **Sistema de Comentários**

   - Adicionar comentários aos tickets
   - Histórico de interações
   - Notificações de novos comentários

4. **Upload de Anexos**

   - Integração com AWS S3
   - Múltiplos anexos por ticket
   - Preview de imagens

5. **Deploy**
   - CI/CD pipeline
   - Deploy em produção

## 👨‍💻 Autor

Raimundo Martins | Desenvolvedor Full Stack

💼 Projeto desenvolvido para fins de demonstração de arquitetura back-end moderna com Node.js, TypeScript e Postgres.
