'use strict';

const User = require('../../api/auth/model/User');

module.exports = {
    Query: {
        users() {
            return User.find();
        },
        user(_, { username }, context) {
            return User.findOne({ username: username });
        }
    },
    Mutation: {
        createUser(_, args, context) {
            const newUser = new User(args.user);
            return newUser.save();
        }
    }

};
