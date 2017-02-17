'use strict';

const Boom = require('boom');
const Sheet = require('../model/Sheet');
const Joi = require('joi');

module.exports = {
    method: 'POST',
    path: '/sheets',
    config: {
        handler: (request, reply) => {

            const sheet = new Sheet(request.payload);

            sheet.save((err) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }

                reply(sheet).code(201);
            });
        },
        validate: {
            payload: Joi.object({
                name: Joi.string(),
                archetype: Joi.string().required(),
                appearance: Joi.string(),
                skills: {
                    fighting: Joi.number(),
                    movement: Joi.number(),
                    social: Joi.number(),
                    learning: Joi.number(),
                    tech: Joi.number()
                }
            })
        },
        description: 'Create a Sheet',
        tags: ['api']
    }
};
