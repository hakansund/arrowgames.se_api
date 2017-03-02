'use strict';

const Controllers = require('../controllers/sheets');

module.exports = {
    Query: {
        sheets() {

            return Controllers.getSheets();
        },
        sheet(_, args, context) {

            return Controllers.getSheet(args.id);
        }
    },
    Mutation: {
        createSheet(_, args, context) {

            return Controllers.createSheet(args.sheet);
        },
        updateSheet(_, args, context) {

            return Controllers.updateSheet(args.sheet);
        },
        deleteSheet(_, args, context) {

            return Controllers.deleteSheet(args.id);
        }
    }

};
