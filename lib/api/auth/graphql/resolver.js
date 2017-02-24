'use strict';

const User = require('../model/User');

module.exports = {
    Query: {
        users() {
            return User.find();
        }
    }

};
