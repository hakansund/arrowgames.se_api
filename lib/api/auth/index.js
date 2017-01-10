'use strict';

const Key = require('../../../config');
const User = require('./model/User');
const Boom = require('boom');

exports.register = (server, options, next) => {

    server.auth.strategy('jwt', 'jwt', true, {
        key: Key,
        verifyOptions: { algorithms: ['HS256'] },
        validateFunc: (decoded, request, callback) => {

            User.findOne({ _id: decoded.id }, (err, user) => {

                if (err) {
                    return callback(Boom.badRequest(err), false);
                }

                if (user) {
                    return callback(null, true);
                }

                return callback(null, false);
            });

        }
    });

    server.route(require('./routes/postLogin'));
    server.route(require('./routes/createUser'));
    server.route(require('./routes/getUsers'));
    server.route(require('./routes/deleteUser'));

    return next();
};

exports.register.attributes = {
    name: 'auth'
};
