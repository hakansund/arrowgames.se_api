'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../../lib');
const Path = require('path');
const Auth = require('../../lib/api/auth');

const internals = {};

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe(' Auth plugin', () => {

    it('plugs in', { parallel: false }, (done) => {

        Server.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            done();
        });
    });

    it('handles register plugin errors', { parallel: false }, (done) => {

        const orig = Auth.register;
        Auth.register = function (server, options, next) {

            Auth.register = orig;
            return next(new Error('register auth failed'));
        };

        Auth.register.attributes = {
            name: 'fake auth'
        };

        Server.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register auth failed');

            done();
        });
    });
});


internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    registrations: [
        {
            plugin: 'hapi-auth-jwt2'
        },
        {
            plugin: '../../lib/api/auth'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
