'use strict';

const User = require('../../api/auth/model/User');

module.exports = {
    Query: {
        users() {

            return User.find();
        },
        user(_, args, context) {

            return User.findOne({ username: args.username });
        }
    },
    Mutation: {
        createUser(_, args, context) {

            const newUser = new User(args.user);
            return newUser.save();
        }
    }

};
