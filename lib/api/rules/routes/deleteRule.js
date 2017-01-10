'use strict';

const Rule = require('../model/Rule');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    method: 'DELETE',
    path: '/rules/{id}',
    config: {
        handler: (request, reply) => {

            Rule.findOneAndRemove({ _id: request.params.id }, (err, rule) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                if (!rule) {
                    return reply(Boom.notFound('No rule found'));
                }

                return reply(rule);
            });
        },
        validate: {
            params: Joi.object({
                id: Joi.objectId().required()
            })
        },
        description: 'Delete a Rule',
        tags: ['api']
    }
};
