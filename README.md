# API REST de Clientes

API REST construída com **Node.js** e **Express 5**, com autenticação via **JWT** e armazenamento em memória.

## Tecnologias

- Node.js (ESModules)
- Express 5
- JSON Web Token (jsonwebtoken)
- CORS

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
AUTH_USER=admin
AUTH_PASS=admin123
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1h
```

## Executando

```bash
npm start
```

O servidor será iniciado na porta definida em `PORT` (padrão: `3000`).

## Endpoints

### Autenticação

| Método | Rota         | Descrição       |
|--------|--------------|-----------------|
| POST   | /auth/login  | Realiza o login |

**Body:**
```json
{
  "usuario": "admin",
  "senha": "admin123"
}
```

**Resposta:**
```json
{
  "token": "<jwt>",
  "msg": "Login realizado com sucesso."
}
```

---

### Clientes

Todas as rotas de clientes exigem o header:
```
Authorization: Bearer <token>
```

| Método | Rota           | Descrição              |
|--------|----------------|------------------------|
| GET    | /cliente       | Lista todos os clientes |
| GET    | /cliente/:id   | Busca cliente por ID   |
| POST   | /cliente       | Insere novo cliente    |
| PUT    | /cliente/:id   | Atualiza cliente       |
| DELETE | /cliente/:id   | Remove cliente         |

**Body para POST/PUT:**
```json
{
  "nome": "João Silva",
  "profissao": "Desenvolvedor"
}
```

## Estrutura do Projeto

```
src/
├── app.js                    # Inicialização do Express
├── config/
│   └── database.js           # Banco de dados em memória
├── controllers/
│   ├── authController.js     # Lógica de autenticação
│   └── clienteController.js  # Lógica de clientes
├── error/
│   └── AppError.js           # Classe de erro personalizada
├── middlewares/
│   ├── authMiddleware.js     # Validação do JWT
│   └── errorMiddleware.js    # Tratamento de erros
├── routers/
│   ├── authRouter.js         # Rotas de autenticação
│   └── clienteRouter.js      # Rotas de clientes
└── services/
    └── clienteService.js     # Regras de negócio de clientes
```

> **Nota:** Os dados são armazenados em memória e serão perdidos ao reiniciar o servidor.
