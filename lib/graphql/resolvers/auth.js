'use strict';

const Controllers = require('../controllers/auth');

module.exports = {
    Query: {
        users() {

            return Controllers.getUsers();
        },
        user(_, args, context) {

            return Controllers.getUser(args.id);
        }
    },
    Mutation: {
        createUser(_, args, context) {

            return Controllers.createUser(args.user);
        },
        deleteUser(_, args, context) {

            return Controllers.deleteUser(args.id);
        }
    }
};
