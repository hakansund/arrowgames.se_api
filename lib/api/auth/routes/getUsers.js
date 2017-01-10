'use strict';

const User = require('../model/User');
const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/users',
    config: {
        handler: (request, reply) => {

            User.find({}, '_id username', (err, users) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!users.length) {
                    return reply(Boom.notFound('No users found'));
                }
                reply(users);
            });
        },
        description: 'Get Users',
        tags: ['api']
    }
};
