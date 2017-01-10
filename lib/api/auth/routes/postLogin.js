'use strict';

const Boom = require('boom');
const User = require('../model/User');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const CreateToken = require('../utils/createToken');

module.exports = {
    method: 'POST',
    path: '/login',
    config: {
        auth: false,
        handler: (request, reply) => {

            User.findOne({ username: request.payload.username }, (err, user) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                if (!user) {
                    return reply(Boom.notFound('User not found'));
                }

                Bcrypt.compare(request.payload.password, user.password, (err, result) => {

                    if (err) {
                        return reply(Boom.badRequest(err));
                    }

                    if (result) {
                        return reply({ token: CreateToken(user) }).code(200);
                    }

                    return reply(Boom.unauthorized('Wrong password'));
                });
            });
        },
        validate: {
            payload: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            })
        },
        description: 'Log in',
        tags: ['api']
    }
};
