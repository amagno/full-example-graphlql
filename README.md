Exemplo de Fullstack com Node.js
=================
### Utilizando Express, GraphQL, React, Apollo entre outrs libs
![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat)


[Demo on heroku](https://rocky-gorge-32768.herokuapp.com/) 


## Executanto localmente
> - Certifique-se de ter o [Node.js](https://nodejs.org/) 6.11.0 ou superior instalado
> - Instale o [Yarn](https://yarnpkg.com/)
> - Instale o MongoDB localmente ou Utilize o Docker para roda o mesmo [Docker](https://hub.docker.com/_/mongo/)
> - Caso queira mude o endereço do Servidor Mongo [MONGO_URL](https://github.com/amagno/full-example-graphlql/blob/master/nodemon.json) no arquivo [nodemon.js](https://github.com/amagno/full-example-graphlql/blob/master/nodemon.json) 
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