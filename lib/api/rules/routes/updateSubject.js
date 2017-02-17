'use strict';

const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Subject = require('../model/Subject');

module.exports = {
    method: 'PATCH',
    path: '/rules/subjects/{id}',
    config: {
        handler: (request, reply) => {

            const id = request.params.id;
            Subject.findOneAndUpdate({ _id: id }, request.payload, { new: true }, (err, subject) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!subject) {
                    return reply(Boom.notFound('Subject not found!'));
                }
                reply({ subject });
            });
        },
        validate: {
            payload: Joi.object({
                name: Joi.string()
            })
        },
        description: 'Update a Subject',
        tags: ['api']
    }
};
