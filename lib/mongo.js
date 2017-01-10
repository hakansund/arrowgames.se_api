'use strict';

const Mongoose = require('mongoose');

const internals = {};

internals.dbUrl = 'mongodb://localhost:27017/ags';

exports.register = function (server, options, next) {

    Mongoose.connect(internals.dbUrl, {}, (err) => {

        if (err) {
            throw err;
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'mongo'
};
