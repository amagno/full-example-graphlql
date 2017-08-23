import { initDataBase } from './mongo.js'
import express from 'express'
import bodyParser from 'body-parser'
import graphqlHTTP from 'express-graphql'
import cors from 'cors'
import schema from './graphql'


const app = express()

app.set('port', (process.env.PORT || 5000))
app.set('mongo_url', (process.env.MONGO_URL || 'Not defined'))
app.set('database_connection', initDataBase())
app.set('build_path', `${__dirname}/../../build`)
console.log(app.get('build_path'))
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(app.get('build_path')))
}

app.use(bodyParser.json())

app.use('/graphql', cors(), graphqlHTTP((req, res) => {
    return {
        schema,
        graphiql: true
    }
}))

app.listen(app.get('port'), () => {
    console.log(`App is running on http://locahost:${app.get('port')}`)
})

export default app

