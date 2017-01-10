'use strict';

const Sinon = require('sinon');
const User = require('../../lib/api/auth/model/User');
const Bcrypt = require('bcrypt');

module.exports.mockedUserPrototype = Sinon.mock(User.prototype);

module.exports.mockedUser = Sinon.mock(User);

module.exports.mockedBcrypt = Sinon.mock(Bcrypt);
