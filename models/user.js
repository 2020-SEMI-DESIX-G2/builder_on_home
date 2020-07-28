const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    avatar: {
        type: String,
        trim: true,
    },
    siteWeb: {
        type: String,
        trim: true,
    },
    phone_number: {
        type: String,
        trim: true,
    },
    direction: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    active: Boolean,
    rating: Number,
    type: {
        type: String,
        trim: true,
    },
    created: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
