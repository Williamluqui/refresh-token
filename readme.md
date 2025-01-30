# Refresh Token API

API de autenticação utilizando Node.js 20+ com Express e TypeScript. Ele implementa
um sistema de **refresh token** seguro, com validações utilizando **bcrypt**,
**JWT**, **Prisma ORM** e **MySQL**.

## Tecnologias Utilizadas

- [Node.js 20+](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv) (para variáveis de ambiente)

## Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd REFRESHTOKEN
   ```
3. Instale as dependências:
   ```sh
   yarn install
   ```

## Configuração do Banco de Dados

1. Configure o arquivo `.env` com as credenciais do banco de dados:
   ```env
   DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
   JWT_SECRET="sua_chave_secreta"
   JWT_EXPIRES_IN="15m"
   REFRESH_TOKEN_EXPIRES_IN="7d"
   ```
2. Execute a migração do banco de dados:
   ```sh
   npx prisma migrate dev --name init
   ```

## Executando o Projeto

### Em Ambiente de Desenvolvimento

```sh
yarn dev
```

### Em Produção

```sh
yarn build
yarn start
```

## Endpoints Principais

### Registro de Usuário

```http
POST /api/auth/register
```

**Body:**

```json
{
  "name": "Seu nome",
  "email": "usuario@email.com",
  "password": "senha_segura"
}
```

### Login e Geração de Tokens

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "senha_segura"
}
```

**Resposta:**

```json
{
    "status": 200,
    "error": false,
    "data": {
        "accessToken": "...",
        "refreshToken": "..."
    }
}
```

### Refresh Token

```http
POST /api/auth/refresh
```

**Authenticate:**

```json
{
  "refreshToken": "..."
}
```

**Resposta:**

```json
{
    "status": 200,
    "error": false,
    "data": {
        "accessToken": "...",
        "refreshToken": "..."
    }
}
```

## Estrutura do Projeto

```
📂 src
 ┣ 📂 controllers   # Controladores das rotas
 ┣ 📂 middlewares   # Middlewares de autenticação e validação
 ┣ 📂 models        # Modelos e definições do Prisma
 ┣ 📂 routes        # Definição das rotas
 ┣ 📂 services      # Serviços e regras de negócio
 ┣ 📂 utils         # Funções auxiliares
 ┣ 📜 server.ts     # Inicialização do servidor
```

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo [LICENSE](LICENSE)
para mais detalhes.
