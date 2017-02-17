'use strict';

const Mongoose = require('mongoose');

const ruleModel = new Mongoose.Schema({
    _subject: { type: Mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true }
});

module.exports = Mongoose.model('Rule', ruleModel);
