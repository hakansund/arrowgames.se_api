'use strict';

const Boom = require('boom');
const Subject = require('../model/Subject');
const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/rules/subjects',
    config: {
        handler: (request, reply) => {

            const subject = new Subject(request.payload);

            subject.save((err) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                reply({ subject }).code(201);
            });
        },
        validate: {
            payload: Joi.object({
                name: Joi.string().required()
            })
        },
        description: 'Create a Subject',
        tags: ['api']
    }
};
