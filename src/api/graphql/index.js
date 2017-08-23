import { makeExecutableSchema } from 'graphql-tools'
import mongoose from 'mongoose'
import schema from './schema.graphql'
import User from '../models/user'

const typeDefs = [ schema ]

const searchUserByField  = (args) => {
    let fields = Object.keys(args) 
    let obj = {}
    
    if(fields.length < 1) {
        return User.find().exec()
    }

    fields.forEach(f => {
            obj[f] = { $regex: args[f], $options: 'i' }
    })
    return User.find(obj).exec()
}
const resolvers = {
    Query: {
        users: async (_, args, context) => {
            try {
                return await searchUserByField(args)
            } catch(error) {
                throw new Error(error)
            }
        },
    },
    Mutation: {
        addUser: async (_, { input }, context) => {
            try {
                return await new User(input).save()
            } catch(error) {
                throw new Error(error)
            }
        },
        updateUser: async (_, args, context) => {
            console.log(args)
            try {
                return await User.findOneAndUpdate({ _id: args.id }, args.input).exec()
            } catch(error) {
                throw new Error(error)
            }
        },
        deleteUser: async (_, args, context) => {
            
            try {
                await User.findByIdAndRemove(args.id).exec()
                return {
                    error: false,
                    message: 'Sucess',
                    id: args.id
                }
            } catch(error) {
                return {
                    error: true,
                    message: error.message,
                    id: args.id
                }
            }
            
        }
    }
}
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default executableSchema