import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import config from './config'
import jwt from 'jsonwebtoken'

const startServer = async () => {
    const app = express()
    // app.use(bodyParser.raw())    
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        // Middleware
        context:({ req, res }) => { 
            if(req.headers.authorization){
                req.token = req.headers.authorization.split('Bearer ')[1]
                try{
                    req.user = jwt.decode(req.token, config.jwt_secret)
                    console.log(req.user) 
                }catch(e){
                    console.log(e)
                }
            }
            
        }
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
