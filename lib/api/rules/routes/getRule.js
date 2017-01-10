'use strict';

const Rule = require('../model/Rule');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const internals = {};

internals.fields = 'id title text';

module.exports = {
    method: 'GET',
    path: '/rules/{id}',
    config: {
        handler: (request, reply) => {

            Rule.findOne({ _id: request.params.id })
                  .select(internals.fields)
                  .exec((err, rule) => {

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
        description: 'Get a Rule',
        tags: ['api']
    }
};
