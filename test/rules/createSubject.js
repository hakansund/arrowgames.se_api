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

describe(' POST /rules/subjects', () => {

    let server;
    const validSubject = Factories.validSubject();
    const invalidSubject = Factories.invalidSubject();
    const mockedSubjectPrototype = Mocks.mockedSubjectPrototype;

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

    it('creates a subject', { parallel: false }, (done) => {

        mockedSubjectPrototype.expects('save')
                              .yields(null);

        const request = {
            method: 'POST',
            url: '/rules/subjects',
            payload: JSON.stringify(validSubject)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(201);
            expect(JSON.parse(reply.payload).subject.title).to.equal(validSubject.title);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedSubjectPrototype.expects('save')
                              .yields(new Error());

        const request = {
            method: 'POST',
            url: '/rules/subjects',
            payload: JSON.stringify(validSubject)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on invalid subject', { parallel: false }, (done) => {

        mockedSubjectPrototype.expects('save')
                           .yields(null);
        const request = {
            method: 'POST',
            url: '/rules/subjects',
            payload: JSON.stringify(invalidSubject)
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
