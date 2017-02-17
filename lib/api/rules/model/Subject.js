'use strict';

const Mongoose = require('mongoose');

const subjectModel = new Mongoose.Schema({
    name: { type: String, required: true }
});

module.exports = Mongoose.model('Subject', subjectModel);
