'use strict';

const Rule = require('../../api/rules/model/Rule');
const Subject = require('../../api/rules/model/Subject');

exports.getRules = () => {

    return Rule.find();
};

exports.getRule = (id) => {

    return Rule.findOne({ _id: id });
};

exports.createRule = async (rule) => {

    const subject_id = rule.subject;
    delete rule.subject;
    const newRule = new Rule(rule);
    const options = { runValidators: true, context: 'query'};
    const savedRule = await newRule.save();
    await Subject.findOneAndUpdate({ _id: subject_id }, {$push: {"rules": savedRule}}, options);
    return savedRule;
};

exports.updateRule = (rule) => {

    const options = { runValidators: true, context: 'query', new: true };
    return Rule.findOneAndUpdate({ _id: rule.id }, rule, options);
};

exports.deleteRule = (id) => {

    return Rule.findOneAndRemove({ _id: id });
};

exports.getSubjects = () => {

    return Subject.find().populate('rules');
};

exports.getSubject = (id) => {

    return Subject.findOne({ _id: id });
};
exports.createSubject = (subject) => {

    const newSubject = new Subject(subject);
    return newSubject.save();
};

exports.updateSubject = (subject) => {

    const options = { runValidators: true, context: 'query', new: true };
    return Subject.findOneAndUpdate({ _id: subject.id }, subject, options);
};

exports.deleteSubject = (id) => {

    return Subject.findOneAndRemove({ _id: id });
};
