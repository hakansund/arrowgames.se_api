'use strict';

const Sheet = require('../../api/sheets/model/Sheet');

module.exports = {
    Query: {
        sheets() {
            return Sheet.find();
        }
    }

};
