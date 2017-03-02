'use strict';

const Merge = require('lodash.merge');

const resolvers = {};

Merge(resolvers, require('./auth'), require('./sheets'), require('./rules'));

module.exports = resolvers;
