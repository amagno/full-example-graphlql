Exemplo de Fullstack com Node.js
=================
### Utilizando Express, GraphQL, React, Apollo entre outras libs
![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat)


[Demo on heroku](https://rocky-gorge-32768.herokuapp.com/) 


## Requisitos
> - [Node.js](https://nodejs.org/) 6.11.0 ou superior instalado
> - [Yarn](https://yarnpkg.com/)
```shell
npm i -g yarn
```
> - MongoDB(https://www.mongodb.com/download-center#community) *Utilize o Docker ;) [Docker](https://hub.docker.com/_/mongo/)
> - Mude o endereço do Servidor MongoDB [MONGO_URL](https://github.com/amagno/full-example-graphlql/blob/master/nodemon.json) e no arquivo [nodemon.js](https://github.com/amagno/full-example-graphlql/blob/master/nodemon.json)

## Dev
```shell
yarn install
yarn watch
```

## Produção
> Primeiro monte os componetes do React 
```shell
yarn install
yarn build
```
> Rode o processo do Express
```shell
NODE_ENV=production
MONGO_URL=mongodb://url
yarn start
```
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
