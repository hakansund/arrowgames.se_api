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

describe(' GET /rules/subjects', () => {

    let server;
    const subjectMock = Mocks.mockedSubject;

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

    it('returns subjects', { parallel: false }, (done) => {

        const validSubject = Factories.validSubject();
        const subjectsList = [validSubject, validSubject];

        subjectMock.expects('find')
                   .yields(null, subjectsList);

        server.inject({ url: '/rules/subjects' }, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(subjectsList);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        subjectMock.expects('find')
                .yields(new Error(), null);

        server.inject({ url: '/rules/subjects' }, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no subjects', { parallel: false }, (done) => {

        subjectMock.expects('find')
                .yields(null, []);

        server.inject({ url: '/rules/subjects' }, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No subjects found');
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
