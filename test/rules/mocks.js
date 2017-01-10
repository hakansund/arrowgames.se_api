'use strict';

const Sinon = require('sinon');
const Rule = require('../../lib/api/rules/model/Rule');

module.exports.mockedRulePrototype = Sinon.mock(Rule.prototype);

module.exports.mockedRule = Sinon.mock(Rule);
