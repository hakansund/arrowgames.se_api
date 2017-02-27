'use strict';

const GraphqlTools = require('graphql-tools');

const Schemas = require('./schemas');
const Resolvers = require('./resolvers');

const executableSchema = GraphqlTools.makeExecutableSchema({
    typeDefs: Schemas,
    resolvers: Resolvers
});

module.exports = executableSchema;
