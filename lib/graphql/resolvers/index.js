'use strict';

const Merge = require('lodash.merge');

const resolvers = {};

Merge(resolvers, require('./auth'), require('./sheets'));

module.exports = resolvers;
