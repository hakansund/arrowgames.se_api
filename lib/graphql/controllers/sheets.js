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

    return Sheet.findOneAndUpdate({ _id: sheet.id }, sheet, { new: true });
};

exports.deleteSheet = (id) => {

    return Sheet.findOneAndRemove({ _id: id });
};
