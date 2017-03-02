'use strict';

const Controllers = require('../controllers/rules');

module.exports = {
    Query: {
        rules() {

            return Controllers.getRules();
        },
        rule(_, args, context) {

            return Controllers.getRule(args.id);
        },
        subjects() {

            return Controllers.getSubjects();
        },
        subject(_, args, context) {

            return Controllers.getSubject(args.id);
        }
    },
    Mutation: {
        createRule(_, args, context) {

            return Controllers.createRule(args.rule);
        },
        updateRule(_, args, context) {

            return Controllers.updateRule(args.rule);
        },
        deleteRule(_, args, context) {

            return Controllers.deleteRule(args.id);
        },
        createSubject(_, args, context) {

            return Controllers.createSubject(args.subject);
        },
        updateSubject(_, args, context) {

            return Controllers.updateSubject(args.subject);
        },
        deleteSubject(_, args, context) {

            return Controllers.deleteSubject(args.id);
        }
    }
};
