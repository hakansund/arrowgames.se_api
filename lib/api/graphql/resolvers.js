'use strict';

const User = require('../auth/model/User');

module.exports = {
    Query: {
        users() {
            return User.find();
        }
    }

};
