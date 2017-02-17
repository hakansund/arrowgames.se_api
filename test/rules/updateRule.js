'use strict';

const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Rule = require('../../lib/api/rules/model/Rule');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' PATCH /rules/{id}', () => {

    let server;
    const createRule = Factories.createRule();
    const dbRule = Factories.dbRule();
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

    it('updates a rule', { parallel: false }, (done) => {

        RuleMock.expects('findOneAndUpdate').yields(null, dbRule);

        const request = {
            method: 'PATCH',
            url: '/rules/111111111111111111111111',
            payload: JSON.stringify(createRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(dbRule);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        RuleMock.expects('findOneAndUpdate').yields(new Error(), null);

        const request = {
            method: 'PATCH',
            url: '/rules/111111111111111111111111',
            payload: JSON.stringify(createRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no rule', { parallel: false }, (done) => {

        RuleMock.expects('findOneAndUpdate').yields(null, null);

        const request = {
            method: 'PATCH',
            url: '/rules/111111111111111111111111',
            payload: JSON.stringify(createRule)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('Rule not found!');
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
