'use strict';

const Glue = require('glue');

const GraphqlHapi = require('graphql-server-hapi').graphqlHapi;
const GraphiqlHapi = require('graphql-server-hapi').graphiqlHapi;
const GraphqlTools = require('graphql-tools');

exports.init = function (manifest, options, next) {

    Glue.compose(manifest, options, (err, server) => {

        if (err) {
            return next(err);
        }

        const ExecutableSchema = GraphqlTools.makeExecutableSchema({
            typeDefs: server.app.graphql_schemas,
            resolvers: server.app.graphql_resolvers
        });

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
