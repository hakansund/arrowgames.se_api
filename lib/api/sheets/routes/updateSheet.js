'use strict';

const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Sheet = require('../model/Sheet');

module.exports = {
    method: 'PATCH',
    path: '/sheets/{id}',
    config: {
        handler: (request, reply) => {

            const id = request.params.id;
            Sheet.findOneAndUpdate({ _id: id }, request.payload, { new: true }, (err, sheet) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!sheet) {
                    return reply(Boom.notFound('Sheet not found!'));
                }
                reply({ sheet });
            });
        },
        validate: {
            payload: Joi.object({
                name: Joi.string(),
                archetype: Joi.string(),
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
        description: 'Update a Sheet',
        tags: ['api']
    }
};
