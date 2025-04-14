import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { datasource } from "./datasource";


const port: number = 3000;

async function initialize() {
  await datasource.initialize(); 
  console.log("Datasource is connected");
  const schema = await buildSchema({
    resolvers: [],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });
  console.log(`GraphQL server ready at ${url} 🚀`);
}

initialize();
