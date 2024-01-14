import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { BooksDataSource } from "./datasources.js";
import { resolvers } from "./schema/resolvers.generated.js";
import { typeDefs } from "./schema/typeDefs.generated.js";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async () => {
      return {
        // We are using a static data set for this example, but normally
        // this would be where you'd add your data source connections
        // or your REST API classes.
        dataSources: {
          booksAPI: new BooksDataSource(),
        },
      };
    },
  })
);

app.listen(4000, async () => {
  console.log(`Listening on port ${4000}`);
});
