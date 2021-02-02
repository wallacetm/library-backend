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

## Rodando com docker-compose

Subindo:
`docker-compose -f "docker-compose.yaml" up -d --build`

Parando:
`docker-compose -f "docker-compose.yaml" down`

## [Typeorm e connection pool](https://orkhan.gitbook.io/typeorm/docs/connection#what-is-connection)
