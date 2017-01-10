'use strict';

const Boom = require('boom');
const User = require('../model/User');

module.exports = (request, reply) => {

    User.findOne({ username: request.payload.username }, (err, user) => {

        if (err) {
            return reply(Boom.badRequest(err));
        }

        if (user) {
            return reply(Boom.badRequest('Username taken'));
        }

        return reply(request.payload);
    });
};
