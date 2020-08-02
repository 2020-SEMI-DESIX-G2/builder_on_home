const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("../graphql/schemas/schema");
const resolvers = require("../graphql/resolvers/resolver");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.log("Error de conexion");
    } else {
      server();
    }
  }
);

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;

      if (token) {
        try {
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.SECRET_KEY
          );
          return {
            user,
          };
        } catch (error) {
          console.log("#### ERROR ####");
          console.log(error);
          throw new Error("Token invalido");
        }
      }
    },
  });

  serverApollo.listen({ port: process.env.NODE_PORT || 4000 }).then(({ url }) => {
    console.log("###############################");
    console.log(`Servidor listo en la url ${url}`);
    console.log("###############################");
  });
}
