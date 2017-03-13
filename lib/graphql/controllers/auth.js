'use strict';

const Bcrypt = require('bcrypt');
const User = require('../../api/auth/model/User');

exports.getUsers = () => {

    return User.find();
};

exports.getUser = (id) => {

    return User.findOne({ _id: id });
};

exports.createUser = async (user) => {

    const newUser = new User();
    newUser.username = user.username;

    await Bcrypt.hash(user.password, 10).then((hash) => {

        newUser.password = hash;
    });

    return newUser.save();
};

exports.deleteUser = (id) => {

    return User.findOneAndRemove({ _id: id });
};
