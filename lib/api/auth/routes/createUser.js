'use strict';

const Boom = require('boom');
const User = require('../model/User');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const VerifyUniqueUser = require('../utils/verifyUniqueUser');

module.exports = {
    method: 'POST',
    path: '/users',
    config: {
        pre: [
            { method: VerifyUniqueUser }
        ],
        handler: (request, reply) => {

            Bcrypt.hash(request.payload.password, 10, (err, hash) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                const user = new User();
                user.username = request.payload.username;
                user.password = hash;

                user.save((err) => {

                    if (err) {
                        return reply(Boom.badRequest(err));
                    }

                    return reply(user).code(201);
                });
            });
        },
        validate: {
            payload: Joi.object({
                username: Joi.string().alphanum().min(5).max(20).required(),
                password: Joi.string().required()
            })
        },
        description: 'Create User',
        tags: ['api']
    }
};
