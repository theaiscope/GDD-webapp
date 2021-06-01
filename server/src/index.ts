import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { SampleModelsResolver } from "./resolvers/SampleModelsResolver"; 

async function main() {
  const schema = await buildSchema({
    resolvers: [SampleModelsResolver]
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}

main();