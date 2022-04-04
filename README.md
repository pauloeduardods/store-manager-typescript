<h1 align="center">Store Manager</h1>

Link para a aplicação: https://pauloedsg.com/recipes-app/

Projeto consistia em fazer uma API REST para um e-commerce, onde podemos consultar editar excluir ou adicionar produtos, vendas ou usuarios

## Aprendizados
 * TypeScript
 * Express
 * JWT
 * MySQL

<h2 align="center">Como rodar o projeto</h2>

### No terminal
1. Clonar o projeto `git clone git@github.com:pauloeduardods/store-manager-typescript.git`
2. Entrar no diretório `cd store-manager-typescript`
3. Instalar as dependências `npm install`
4. Configurar o arquivo `.env` para conectar corretamente ao MySQL
5. Rodar a aplicação `npm start`
6. Acessar a aplicação `http://localhost:3000`


## Rotas

  * POST `/login`
  * POST `/users`
  * GET, POST `/products`
  * GET, POST `/orders`
  * GET `/orders/{id}`

## Status

Finalizado
