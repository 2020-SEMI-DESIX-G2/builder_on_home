const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    email: String
    siteWeb: String
    description: String
    password: String
    avatar: String
    createAt: String
  }
  type Token {
    token: String
  }
  type Contract {
    id: ID,
    userID: String,
    clientID: String,
    serviceID: String,
    detail: String,
    price: Float,
  }
  type Service {
    id: ID,
    name: String!,
    userID: ID,
    categoryID: String!,
    description: String!,
    price: Float,
    active: Boolean,
    created: String,
    updated_date: String
  }
  input UserInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  input ContractInput {
    userID: String!,
    clientID: String!,
    serviceID: String!,
    detail: String,
    price: Float,
  }
  input ServiceInput {
    name: String!,
    userID: String!,
    categoryID: String!,
    description: String!,
    price: Float
  }

  type Query {
    # User
    getUser(id: ID, username: String): User

    #services
    getServices(username: String): [Service]
    getUserServices(username: String): [Service]
    getService(id: ID!): Service

    #contracts
    getContracts(username: String!): [Contract]
    getUserContracts(username: String!): [Contract]
    getContract(id: ID!): Contract
  }

  type Mutation {
    # User
    register(input: UserInput): User
    login(input: LoginInput): Token
    createContract(input: ContractInput): Contract
    updateContract(id: ID, input: ContractInput): Contract
    removeContract(id: ID): Contract
    createService(input: ServiceInput): Service
    updateService(id: ID, input: ServiceInput): Service
    removeService(id: ID): Service
  }
`;

module.exports = typeDefs;
