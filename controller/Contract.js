const Contract = require("../models/contract");

async function createContract(input) {
    const newContract = input;
    const { clientID,
        serviceID,
        detail,
        price } = newContract;


    try {
        const contract = new Contract(newContract);
        console.log(contract);
        contract.save();
        return contract;
    } catch (error) {
        console.log(error);
    }
}

async function getContracts(username) {
    const user = await User.findOne({ username });
    console.log('user service ' + username);
    // if (!user) throw new Error("Usuario no encontrado.");

    const contracts = await Contract.find().exec();

    return contracts;
}

async function getUserContracts(username) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado.");

    const contracts = await Contract.find()
        .where({ userID: user._id })
        .sort({ created: -1 });

    return contracts;
}

async function getContract(id) {
    console.log(id);

    const contract = await Contract.findById(id)
        .sort({ created: -1 });

    return contract;
}
async function updateContract(id, input) {
    const newContract = input;
    const { clientID,
        serviceID,
        detail,
        price } = newContract;

    try {
        return Contract.findByIdAndUpdate(id, {
            clientID: newContract.clientID,
            serviceID: newContract.serviceID,
            detail: newContract.detail,
            price: newContract.price,
            updated_date: Date.now(),
        }, function (err) {
            console.log(err);
            if (err) return next(err);
        });
    } catch (error) {
        console.log(error);
    }
}
async function removeContract(id) {
    const services = await Contract.findByIdAndRemove(id).exec();

    return services;
}

module.exports = {
    createContract,
};
