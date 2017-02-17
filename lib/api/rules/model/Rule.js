'use strict';

const Mongoose = require('mongoose');

const ruleModel = new Mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true }
},
{ timestamps: true });

module.exports = Mongoose.model('Rule', ruleModel);
