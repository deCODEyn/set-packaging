# Set Packaging API

Uma API desenvolvida em NestJS que calcula a melhor caixa para empacotar pedidos utilizando algoritmos de otimização de embalagem.

## Sobre o Projeto

Esta API recebe pedidos com produtos e suas dimensões, e retorna a melhor combinação de caixas para empacotar todos os produtos de forma otimizada. O sistema utiliza algoritmos de empacotamento para minimizar o espaço desperdiçado e encontrar a solução mais eficiente.

## Tecnologias Utilizadas

- **NestJS** - Framework Node.js para aplicações server-side
- **TypeScript** - Linguagem de programação
- **JWT** - Autenticação baseada em tokens
- **Swagger** - Documentação automática da API
- **Docker** - Containerização da aplicação
- **Jest** - Framework de testes

## Documentação da API

A documentação completa da API está disponível através do Swagger UI em:

```
http://localhost:3333/api
```

## Autenticação

A API utiliza autenticação JWT (JSON Web Token). Para acessar os endpoints protegidos, você precisa:

1. Fazer login através do endpoint `/auth/login`
2. Usar o token retornado no header `Authorization: Bearer <token>`

### Usuário de Teste

Para facilitar os testes, existe um usuário fixo configurado:

- **Username:** `admin`
- **Password:** `admin`

## Rotas da API

### Autenticação

#### `POST /auth/login`
Faz login na aplicação e retorna um token JWT.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Pedidos

#### `POST /orders/pack` 🔒
Calcula a melhor embalagem para os pedidos enviados.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "pedidos": [
    {
      "pedido_id": 1,
      "produtos": [
        {
          "produto_id": "PS5",
          "dimensoes": {
            "altura": 40,
            "largura": 10,
            "comprimento": 25
          }
        },
        {
          "produto_id": "Volante",
          "dimensoes": {
            "altura": 40,
            "largura": 30,
            "comprimento": 30
          }
        }
      ]
    }
  ]
}
```

**Response:**
```json
{
  "orders": [
    {
      "orderId": 1,
      "boxes": [
        {
          "id": "box-1",
          "products": ["PS5", "Volante"],
          "dimensions": {
            "height": 40,
            "width": 30,
            "length": 30
          }
        }
      ]
    }
  ]
}
```

## Executando com Docker

### Pré-requisitos

- Docker instalado
- Docker Compose (opcional)

### Build e Execução

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd set-packaging
```

2. **Build da imagem Docker:**
```bash
docker build -t set-packaging .
```

3. **Executar o container:**
```bash
docker run -p 3333:3333 set-packaging
```

A aplicação estará disponível em: `http://localhost:3333`

## Desenvolvimento Local

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em modo de desenvolvimento:**
```bash
npm run start:dev
```

3. **Build para produção:**
```bash
npm run build
npm run start:prod
```

### Scripts Disponíveis

- `npm run start` - Inicia a aplicação
- `npm run start:dev` - Inicia em modo de desenvolvimento com hot-reload
- `npm run start:debug` - Inicia em modo de debug
- `npm run start:prod` - Inicia em modo de produção
- `npm run build` - Compila a aplicação
- `npm run test` - Executa os testes unitários
- `npm run test:watch` - Executa os testes em modo watch
- `npm run test:cov` - Executa os testes com cobertura
- `npm run test:e2e` - Executa os testes end-to-end
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código

## Testes

O projeto inclui uma suíte completa de testes automatizados:

### Tipos de Testes

1. **Testes Unitários** - Testam componentes individuais
   - `src/auth/auth.service.spec.ts`
   - `src/orders/orders.controller.spec.ts`
   - `src/orders/orders.service.spec.ts`
   - `src/orders/utils/set-packaging.spec.ts`

2. **Testes End-to-End** - Testam o fluxo completo da aplicação
   - `test/orders.e2e-spec.ts`

### Executando os Testes

```bash
# Todos os testes
npm test

# Testes com cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e

# Testes em modo watch
npm run test:watch
```

### Cobertura de Testes

Após executar `npm run test:cov`, o relatório de cobertura será gerado na pasta `coverage/`. Abra `coverage/lcov-report/index.html` no navegador para visualizar o relatório detalhado.

## Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── dto/
├── orders/               # Módulo de pedidos
│   ├── orders.controller.ts
│   ├── orders.service.ts
│   ├── dto/
│   └── utils/
├── products/             # Entidades de produtos
├── boxes/                # Lógica de caixas
├── constants/            # Constantes da aplicação
├── app.module.ts         # Módulo principal
└── main.ts              # Ponto de entrada da aplicação

test/                     # Testes end-to-end
├── orders.e2e-spec.ts
└── jest-e2e.json

Dockerfile               # Configuração do Docker
docker-compose.yml       # Configuração do Docker Compose
package.json             # Dependências e scripts
```

## Configuração

### Variáveis de Ambiente

A aplicação utiliza as seguintes variáveis de ambiente:

- `PORT` - Porta onde a aplicação será executada (padrão: 3333)

### Configurações JWT

As configurações JWT estão definidas em `src/constants/auth.constants.ts`:

- `JWT_SECRET` - Chave secreta para assinar os tokens
- `JWT_EXPIRATION` - Tempo de expiração dos tokens (1 hora)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
