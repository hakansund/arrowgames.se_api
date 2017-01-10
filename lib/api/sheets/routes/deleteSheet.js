'use strict';

const Sheet = require('../model/Sheet');
const Boom = require('boom');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    method: 'DELETE',
    path: '/sheets/{id}',
    config: {
        handler: (request, reply) => {

            Sheet.findOneAndRemove({ _id: request.params.id }, (err, sheet) => {

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
        description: 'Delete a Sheet',
        tags: ['api']
    }
};
