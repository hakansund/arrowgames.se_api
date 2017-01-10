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

describe(' DELETE /sheets/{id}', () => {

    let server;
    const mockedSheet = Mocks.mockedSheet;

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

    it('removes sheet', { parallel: false }, (done) => {

        const validSheet = Factories.validSheet();

        mockedSheet.expects('findOneAndRemove')
                    .yields(null, validSheet);

        const request = {
            method: 'DELETE',
            url: '/sheets/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(validSheet);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedSheet.expects('findOneAndRemove')
                    .yields(new Error(), null);

        const request = {
            method: 'DELETE',
            url: '/sheets/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no sheet', { parallel: false }, (done) => {

        mockedSheet.expects('findOneAndRemove')
                    .yields(null, null);

        const request = {
            method: 'DELETE',
            url: '/sheets/111111111111111111111111'
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No sheet found');
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
            plugin: '../../lib/api/sheets'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
