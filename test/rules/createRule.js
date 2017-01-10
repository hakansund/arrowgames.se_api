'use strict';

const Code = require('code');
const Lab = require('lab');
require('sinon-mongoose');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Mocks = require('./mocks');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' POST /rules', () => {

    let server;
    const validRule = Factories.validRule();
    const invalidRule = Factories.invalidRule();
    const mockedRulePrototype = Mocks.mockedRulePrototype;

    lab.beforeEach((done) => {

        Server.init(internals.manifest, internals.composeOptions, (err, srv) => {

            expect(err).to.not.exist();
            server = srv;

            done();
        });

    });

    lab.afterEach((done) => {

        server.stop(done);
    });

    it('creates a race', { parallel: false }, (done) => {

        mockedRulePrototype.expects('save')
                           .yields(null);

        const request = {
            method: 'POST',
            url: '/rules',
            payload: JSON.stringify(validRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(201);
            expect(JSON.parse(reply.payload).rule.title).to.equal(validRule.title);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedRulePrototype.expects('save')
                           .yields(new Error());

        const request = {
            method: 'POST',
            url: '/rules',
            payload: JSON.stringify(validRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on invalid race', { parallel: false }, (done) => {

        mockedRulePrototype.expects('save')
                           .yields(null);
        const request = {
            method: 'POST',
            url: '/rules',
            payload: JSON.stringify(invalidRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
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
            plugin: '../../lib/api/rules'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
