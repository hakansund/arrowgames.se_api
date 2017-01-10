'use strict';

const Mongoose = require('mongoose');

const userModel = new Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = Mongoose.model('User', userModel);
