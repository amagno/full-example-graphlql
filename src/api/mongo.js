import mongoose from 'mongoose'

const mongo_url = process.env.MONGO_URL || undefined
const dev = process.env.NODE_ENV === 'production' ? false : true

export const initDataBase = () => {
    if(!mongo_url) throw new Error('MongoDB URL is not defined on env!')

    if(dev) mongoose.set('debug', true)

    mongoose.connect(mongo_url)

    const connection = mongoose.connection

    connection
    .on('error', () => {
        throw new Error(`Error on connect to database ${mongo_url}`)
    })
    .once('open', () => {
        console.log(`Connected to server database: ${mongo_url}`)
    })

    return connection
}

