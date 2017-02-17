'use strict';

const Subject = require('../model/Subject');
const Boom = require('boom');

const internals = {};

internals.fields = '_id name';

module.exports = {
    method: 'GET',
    path: '/rules/subjects',
    config: {
        handler: (request, reply) => {

            Subject.find({}, internals.fields, (err, subjects) => {

                if (err) {
                    return reply(Boom.badRequest(err));
                }
                if (!subjects.length) {
                    return reply(Boom.notFound('No subjects found'));
                }
                return reply(subjects);
            });
        },
        description: 'Get Subjects',
        tags: ['api']
    }
};
