import { makeExecutableSchema } from 'graphql-tools'
import mongoose from 'mongoose'
import schema from './schema.graphql'
import User from '../models/user'

const typeDefs = [ schema ]
class Status {
    constructor(error = false, message, id) {
        return {
            error,
            message,
            id
        }
    }
}
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
                let user = await new User(input).save()
            } catch(error) {
                return new Status(true, error.message, undefined)
            }
        },
        updateUser: async (_, args, context) => {
            console.log(args)
            try {
                return await User.findOneAndUpdate({ _id: args.id }, args.input).exec()
            } catch(error) {
                return new Status(true, error.message, args.id)
            }
        },
        deleteUser: async (_, args, context) => {
            
            try {
                await User.findByIdAndRemove(args.id).exec()
                return new Status(false, 'Success', args.id)
            } catch(error) {
                return new Status(true, error.message, args.id)
            }
            
        }
    }
}
const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default executableSchema