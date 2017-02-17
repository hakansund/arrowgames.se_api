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

describe(' DELETE /rules/subjects/{id}', () => {

    let server;
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

    it('removes subject', { parallel: false }, (done) => {

        const validSubject = Factories.validSubject();

        mockedSubject.expects('findOneAndRemove')
                    .yields(null, validSubject);

        const request = {
            method: 'DELETE',
            url: '/rules/subjects/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(validSubject);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedSubject.expects('findOneAndRemove')
                    .yields(new Error(), null);

        const request = {
            method: 'DELETE',
            url: '/rules/subjects/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no subject', { parallel: false }, (done) => {

        mockedSubject.expects('findOneAndRemove')
                    .yields(null, null);

        const request = {
            method: 'DELETE',
            url: '/rules/subjects/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No subject found');
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
