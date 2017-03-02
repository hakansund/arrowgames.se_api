'use strict';

const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const userModel = new Mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userModel.plugin(UniqueValidator);

module.exports = Mongoose.model('User', userModel);
