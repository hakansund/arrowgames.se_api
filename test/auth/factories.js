'use strict';

module.exports.invalidUser = () => {

    return {
        invalid: true
    };
};

module.exports.createUser = () => {

    return {
        username: 'username123',
        password: 'password123'
    };
};

module.exports.dbUser = () => {

    return {
        _id: '507f1f77bcf86cd799439011',
        username: 'username123',
        password: 'password123'
    };
};
