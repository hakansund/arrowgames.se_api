'use strict';

module.exports.invalidUser = () => {

    return {
        invalid: true
    };
};

module.exports.validUser = () => {

    return {
        username: 'username123',
        password: 'password123'
    };
};
