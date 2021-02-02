# Desafio Omnichat

Serviço para atender ao [desafio](/DESAFIO.md).

## Inicializando o serviço

Rodar o comando `npm i`.

Criar um arquivo `.env` e inserir as variaveis de ambiente:

- DB_DATABASE
- DB_HOST
- DB_PORT
- DB_PASS
- DB_USER

Rodar o comando `npm start` ou `npm run build && npm run start:prod`.

## Rodar testes

Para rodar os testes é necessário instalar o sqlite3:
`npm i sqlite3 @types/sqlite3`

Rodar o comando `npm test` ou `npm run test:cov`.

## Rodando com docker-compose

Subindo:
`docker-compose -f "docker-compose.yaml" up -d --build`

Parando:
`docker-compose -f "docker-compose.yaml" down`

## [Typeorm e connection pool](https://orkhan.gitbook.io/typeorm/docs/connection#what-is-connection)
