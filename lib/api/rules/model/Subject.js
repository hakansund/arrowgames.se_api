'use strict';

const Mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

const subjectModel = new Mongoose.Schema({
    name: { type: String, required: true, unique: true },
    rules: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Rule' }]
});

subjectModel.plugin(UniqueValidator);

module.exports = Mongoose.model('Subject', subjectModel);
