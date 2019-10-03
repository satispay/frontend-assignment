import * as fs from "fs";
import { ApolloServer, gql } from "apollo-server";

import { resolvers } from "./resolvers";

const schema = fs.readFileSync("schema.graphql", "utf8");

const typeDefs = gql(schema);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
