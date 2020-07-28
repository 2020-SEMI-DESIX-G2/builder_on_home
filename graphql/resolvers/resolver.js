const userController = require("../../controller/user");
const contractController = require('../../controller/Contract');
const serviceController = require('../../controller/Service');

const resolvers = {
  Query: {
    // User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    // services
    getServices: (_, { username }) => serviceController.getServices(username),
    getUserServices: (_, { username }) =>
    serviceController.getUserServices(username),
    getService: (_, { id }) => serviceController.getService(id),
    // contract
    getContracts: (_, { username }) =>
    contractController.getContracts(username),
    getUserContracts: (_, { username }) =>
    contractController.getUserContracts(username),
    getContract: (_, { id }) => contractController.getContract(id),
  },
  Mutation: {
    // User
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    createContract: (_, { input }) => contractController.createContract(input),
    createContract: (_, { input }) => contractController.createContract(input),
    updateContract: (_, { id, input }) => contractController.updateContract(id, input),
    removeContract: (_, { id }) => contractController.removeContract(id),

    createService: (_, { input }) => serviceController.createService(input),
    updateService: (_, { id, input }) => serviceController.updateService(id, input),
    removeService: (_, { id }) => serviceController.removeService(id),
  },
};

module.exports = resolvers;
