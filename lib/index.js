'use strict';

const Glue = require('glue');

const GraphqlHapi = require('graphql-server-hapi').graphqlHapi;
const GraphiqlHapi = require('graphql-server-hapi').graphiqlHapi;

const ExecutableSchema = require('./api/graphql');

const internals = {};

internals.graphqlAuthStrategy = process.env.NODE_ENV === 'production' ? true : false;

exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        server.register({
            register: GraphqlHapi,
            options: {
                graphqlOptions: {
                    schema: ExecutableSchema
                }
            }
        });

        server.register({
            register: GraphiqlHapi,
            options: {
                path: '/graphiql',
                graphiqlOptions: {
                    endpointURL: '/graphql'
                }
            }
        });

        server.start((err) => {

            return next(err, server);
        });
    });
};
