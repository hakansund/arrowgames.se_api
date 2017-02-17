'use strict';

const Sinon = require('sinon');
require('sinon-mongoose');
const Rule = require('../../lib/api/rules/model/Rule');
const Subject = require('../../lib/api/rules/model/Subject');

module.exports.mockedRulePrototype = Sinon.mock(Rule.prototype);

module.exports.mockedRule = Sinon.mock(Rule);

module.exports.mockedSubject = Sinon.mock(Subject);

module.exports.mockedSubjectPrototype = Sinon.mock(Subject.prototype);
