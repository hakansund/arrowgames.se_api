'use strict';

const Rule = require('../model/Rule');
const Boom = require('boom');

const internals = {};

internals.fields = '_id title text';

module.exports = {
    method: 'GET',
    path: '/rules',
    config: {
        handler: (request, reply) => {

            Rule.find({}, internals.fields, (err, rules) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!rules.length) {
                    return reply(Boom.notFound('No rules found'));
                }
                return reply(rules);
            });
        },
        description: 'Get Rules',
        tags: ['api']
    }
};
