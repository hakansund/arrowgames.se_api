'use strict';

const Subject = require('../model/Subject');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    method: 'DELETE',
    path: '/rules/subjects/{id}',
    config: {
        handler: (request, reply) => {

            Subject.findOneAndRemove({ _id: request.params.id }, (err, subject) => {

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
        description: 'Delete a Subject',
        tags: ['api']
    }
};
