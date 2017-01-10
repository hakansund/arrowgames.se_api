'use strict';

const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
require('sinon-mongoose');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Rule = require('../../lib/api/rules/model/Rule');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' GET /rules', () => {

    let server;
    const RuleMock = Sinon.mock(Rule);

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

    it('returns rules', { parallel: false }, (done) => {

        const validRule = Factories.validRule();
        const rulesList = [validRule, validRule];

        RuleMock.expects('find')
                .yields(null, rulesList);

        server.inject({ url: '/rules' }, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(rulesList);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        RuleMock.expects('find')
                .yields(new Error(), null);

        server.inject({ url: '/rules' }, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no rules', { parallel: false }, (done) => {

        RuleMock.expects('find')
                .yields(null, []);

        server.inject({ url: '/rules' }, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No rules found');
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
