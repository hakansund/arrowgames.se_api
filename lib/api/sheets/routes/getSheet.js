'use strict';

const Sheet = require('../model/Sheet');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const internals = {};

internals.fields = 'id name archetype appearance skills';

module.exports = {
    method: 'GET',
    path: '/sheets/{id}',
    config: {
        handler: (request, reply) => {

            Sheet.findOne({ _id: request.params.id })
                  .select(internals.fields)
                  .exec((err, sheet) => {

                      if (err) {
                          return reply(Boom.badRequest(err));
                      }

                      if (!sheet) {
                          return reply(Boom.notFound('No sheet found'));
                      }

                      return reply(sheet);
                  });
        },
        validate: {
            params: Joi.object({
                id: Joi.objectId().required()
            })
        },
        description: 'Get a Sheet',
        tags: ['api']
    }
};
