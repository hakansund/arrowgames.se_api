'use strict';

const Sinon = require('sinon');
const Sheet = require('../../lib/api/sheets/model/Sheet');

module.exports.mockedSheetPrototype = Sinon.mock(Sheet.prototype);

module.exports.mockedSheet = Sinon.mock(Sheet);
