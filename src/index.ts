import loadEnvironment from "./utils/loadEnvironment.js";
loadEnvironment();

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./schemas/resolvers.generated.js";
import { typeDefs } from "./schemas/typeDefs.generated.js";
import express from "express";
import connectMongo from "./utils/connectMongo.js";
import type { IUser } from "./models/userModel.js";
import extractTokenFromHeader from "./utils/extractTokenFromHeader.js";
import getUserByToken from "./utils/getUserByToken.js";

await connectMongo();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.

export interface MyContext {
  user?: IUser;
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
    context: async ({ req, res }) => {
      let user: IUser | null = null;

      if (req.headers.authorization) {
        const token = extractTokenFromHeader(req.headers.authorization);

        user = await getUserByToken(token);

        user.set("token", token);
      }

      return {
        user,
      };
    },
  })
);

app.listen(process.env.PORT, async () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
