'use strict';

const Sheet = require('../../api/sheets/model/Sheet');

module.exports = {
    Query: {
        sheets() {

            return Sheet.find();
        },
        sheet(_, args, context) {

            return Sheet.findOne({ _id: args.id });
        }
    },
    Mutation: {
        createSheet(_, args, context) {

            const newSheet = new Sheet(args.sheet);
            return newSheet.save();
        }
    }

};
