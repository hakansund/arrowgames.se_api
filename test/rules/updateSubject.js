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

describe(' PATCH /rules/subjects/{id}', () => {

    let server;
    const validSubject = Factories.validSubject();
    const mockedSubject = Mocks.mockedSubject;

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

    it('updates a subject', { parallel: false }, (done) => {

        mockedSubject.expects('findOneAndUpdate').yields(null, validSubject);

        const request = {
            method: 'PATCH',
            url: '/rules/subjects/111111111111111111111111',
            payload: JSON.stringify(validSubject)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload).subject).to.equal(validSubject);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedSubject.expects('findOneAndUpdate').yields(new Error(), null);

        const request = {
            method: 'PATCH',
            url: '/rules/subjects/111111111111111111111111',
            payload: JSON.stringify(validSubject)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no subject', { parallel: false }, (done) => {

        mockedSubject.expects('findOneAndUpdate').yields(null, null);

        const request = {
            method: 'PATCH',
            url: '/rules/subjects/111111111111111111111111',
            payload: JSON.stringify(validSubject)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('Subject not found!');
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
