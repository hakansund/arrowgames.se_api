'use strict';

const Sheet = require('../model/Sheet');
const Boom = require('boom');

const internals = {};

internals.fields = 'id name archetype appearance skills';

module.exports = {
    method: 'GET',
    path: '/sheets',
    config: {
        handler: (request, reply) => {

            Sheet.find({}, internals.fields, (err, sheets) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!sheets.length) {
                    return reply(Boom.notFound('No sheets found'));
                }
                return reply(sheets);
            });
        },
        description: 'Get Sheets',
        tags: ['api']
    }
};
