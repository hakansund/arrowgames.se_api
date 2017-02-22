'use strict';

const GraphqlTools = require('graphql-tools');

const Schema = require('./schema');
const Resolvers = require('./resolvers');

module.exports = GraphqlTools.makeExecutableSchema({
    typeDefs: [Schema],
    resolvers: Resolvers
});
