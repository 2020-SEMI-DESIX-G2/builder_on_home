const Service = require("../models/service");
const User = require("../models/user");

async function createService(input) {
    const newService = input;
    const { name,
        userID,
        categoryID,
        description,
        price } = newService;


    try {
        const service = new Service(newService);
        console.log(service);
        service.save();
        return service;
    } catch (error) {
        console.log(error);
    }
}

async function getServices(username) {
    console.log('user service ' + username);
    // if (!user) throw new Error("Usuario no encontrado.");

    const services = await Service.find().exec();

    return services;
}

async function getUserServices(username) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado.");

    const services = await Service.find()
        .where({ userID: user._id })
        .sort({ created: -1 });

    return services;
}

async function getService(id) {
    console.log(id);

    const services = await Service.findById(id)
        .sort({ created: -1 });

    return services;
}
async function updateService(id, input) {
    const newService = input;
    const { name,
        userID,
        categoryID,
        description,
        price } = newService;

    try {
        return Service.findByIdAndUpdate(id, {
            name: newService.name,
            userID: newService.userID,
            categoryID: newService.categoryID,
            description: newService.description,
            price: newService.price,
            updated_date: Date.now(),
        }, function (err) {
            console.log(err);
            if (err) return next(err);
        });
    } catch (error) {
        console.log(error);
    }
}
async function removeService(id) {
    const services = await Service.findByIdAndRemove(id).exec();

    return services;
}

module.exports = {
    createService,
    getServices,
    getUserServices,
    getService,
    updateService,
    removeService
};
