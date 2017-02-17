'use strict';

const Subject = require('../model/Subject');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const internals = {};

internals.fields = 'id title text';

module.exports = {
    method: 'GET',
    path: '/rules/subjects/{id}',
    config: {
        handler: (request, reply) => {

            Subject.findOne({ _id: request.params.id })
                  .select(internals.fields)
                  .exec((err, subject) => {

                      if (err) {
                          return reply(Boom.badRequest(err));
                      }

                      if (!subject) {
                          return reply(Boom.notFound('No subject found'));
                      }

                      return reply(subject);
                  });
        },
        validate: {
            params: Joi.object({
                id: Joi.objectId().required()
            })
        },
        description: 'Get a Subject',
        tags: ['api']
    }
};
