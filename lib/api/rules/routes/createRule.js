'use strict';

const Boom = require('boom');
const Rule = require('../model/Rule');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    method: 'POST',
    path: '/rules',
    config: {
        handler: (request, reply) => {

            const rule = new Rule(request.payload);

            rule.save((err, rule) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                reply(rule).code(201);
            });
        },
        validate: {
            payload: Joi.object({
                _subject: Joi.objectId(),
                title: Joi.string().required(),
                text: Joi.string().required()
            })
        },
        description: 'Create a Rule',
        tags: ['api']
    }
};
