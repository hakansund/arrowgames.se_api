'use strict';

const Jwt = require('jsonwebtoken');
const Key = require('../../../../config');

module.exports = (user) => {

    return Jwt.sign({ id: user._id, username: user.username }, Key, { expiresIn: '8h' } );
};
