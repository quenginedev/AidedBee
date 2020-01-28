import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import config from './config'

const startServer = async () => {
    const app = express()
    // app.use(bodyParser.raw())    
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.applyMiddleware({app})

    await mongoose.connect(config.mongodb_uri, {useNewUrlParser: true})

    app.listen(3000, ()=>{
        console.log('server ready... GQL path: localhost:3000/', server.graphqlPath)
    }) 
}

startServer()
    .then()
    .catch(err=>{
        console.error(err)
    })
