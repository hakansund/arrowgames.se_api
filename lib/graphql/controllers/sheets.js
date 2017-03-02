'use strict';

const Sheet = require('../../api/sheets/model/Sheet');

exports.getSheets = () => {

    return Sheet.find();
};

exports.getSheet = (id) => {

    return Sheet.findOne({ _id: id });
};

exports.createSheet = (sheet) => {

    const newSheet = new Sheet(sheet);
    return newSheet.save();
};

exports.updateSheet = (sheet) => {

    const options = { runValidators: true, context: 'query', new: true };
    return Sheet.findOneAndUpdate({ _id: sheet.id }, sheet, options);
};

exports.deleteSheet = (id) => {

    return Sheet.findOneAndRemove({ _id: id });
};
