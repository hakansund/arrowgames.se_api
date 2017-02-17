'use strict';

const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Rule = require('../model/Rule');

module.exports = {
    method: 'PATCH',
    path: '/rules/{id}',
    config: {
        handler: (request, reply) => {

            const id = request.params.id;
            Rule.findOneAndUpdate({ _id: id }, request.payload, { new: true }, (err, rule) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!rule) {
                    return reply(Boom.notFound('Rule not found!'));
                }
                reply(rule);
            });
        },
        validate: {
            payload: Joi.object({
                title: Joi.string(),
                text: Joi.string()
            })
        },
        description: 'Update a Rule',
        tags: ['api']
    }
};
