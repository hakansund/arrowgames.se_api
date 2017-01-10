'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../../lib');
const Path = require('path');
const Rules = require('../../lib/api/rules');

const internals = {};

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe(' Rules plugin', () => {

    it('plugs in', { parallel: false }, (done) => {

        Server.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            done();
        });
    });

    it('handles register plugin errors', { parallel: false }, (done) => {

        const orig = Rules.register;
        Rules.register = function (server, options, next) {

            Rules.register = orig;
            return next(new Error('register rules failed'));
        };

        Rules.register.attributes = {
            name: 'fake rules'
        };

        Server.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register rules failed');

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
            plugin: '../../lib/api/rules'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
