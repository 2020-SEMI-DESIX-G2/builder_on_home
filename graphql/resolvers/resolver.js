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
    updateAvatar: (_, { file }, ctx) => userController.updateAvatar(file, ctx),
    deleteAvatar: (_, {}, ctx) => userController.deleteAvatar(ctx),
    updateUser: (_, { username, input }) => userController.updateUser(username, input),
    createContract: (_, { username, input }) => contractController.createContract(username, input),
    updateContract: (_, { id, input }) => contractController.updateContract(id, input),
    updateContractPay: (_, { id, input }) => contractController.updateContractPay(id, input),
    removeContract: (_, { id }) => contractController.removeContract(id),

    createService: (_, { username, input }) => serviceController.createService(username, input),
    updateService: (_, { id, input }) => serviceController.updateService(id, input),
    removeService: (_, { id }) => serviceController.removeService(id),
  },
};

module.exports = resolvers;
