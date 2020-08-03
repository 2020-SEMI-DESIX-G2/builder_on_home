const Contract = require("../models/contract");
const User = require("../models/user");

async function createContract(username, input) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado.");
    const newContract = input;
    const { 
        workerID,
        clientID,
        serviceID,
        detail,
        price } = newContract;
    newContract.clientID = user.id;

    try {
        const contract = new Contract(newContract);
        console.log(contract);
        contract.save();
        return contract;
    } catch (error) {
        console.log(error.message);
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

async function updateContractPay(id, input) {
    console.log(input);
    const newPayment = input;
    const { stateID, payment } = newPayment;
    try {
        return Contract.findByIdAndUpdate(id, {
            stateID: newPayment.stateID,
            payment: newPayment.payment,
        }, function (err) {
            console.log(err);
            if (err) return next(err);
        });
    } catch (error) {
        console.log(error);
    }
}
async function removeContract(id) {
    const contract = await Contract.findByIdAndRemove(id).exec();
    return contract;
}

module.exports = {
    createContract,
    updateContractPay,
};
