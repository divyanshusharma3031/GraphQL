import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server=new ApolloServer(
    {
        typeDefs,
        resolvers
    }
)

const port=process.env.PORT || 3000;

const {url}=await startStandaloneServer(server,{
    listen:{
        port
    }
});

console.log("Server Started at port : ",port);

/*
    ^ The name of the resolvers should bw the same as the type that you have described  
*/