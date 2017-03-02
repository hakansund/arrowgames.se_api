'use strict';

const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const ruleModel = new Mongoose.Schema({
    _subject: { type: Mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true, unique: true },
    text: { type: String, required: true }
},
{ timestamps: true });

ruleModel.plugin(UniqueValidator);

module.exports = Mongoose.model('Rule', ruleModel);
