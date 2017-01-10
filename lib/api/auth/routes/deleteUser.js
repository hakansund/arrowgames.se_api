'use strict';

const User = require('../model/User');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    method: 'DELETE',
    path: '/users/{id}',
    config: {
        handler: (request, reply) => {

            User.findOneAndRemove({ _id: request.params.id }, (err, user) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                if (!user) {
                    return reply(Boom.notFound('No user found'));
                }

                return reply(user);
            });
        },
        validate: {
            params: Joi.object({
                id: Joi.objectId().required()
            })
        },
        description: 'Delete a User',
        tags: ['api']
    }
};
