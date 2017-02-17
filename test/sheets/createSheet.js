'use strict';

const Code = require('code');
const Lab = require('lab');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Mocks = require('./mocks');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' POST /sheets', () => {

    let server;
    const createSheet = Factories.createSheet();
    const invalidSheet = Factories.invalidSheet();
    const mockedSheetPrototype = Mocks.mockedSheetPrototype;

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

    it('creates a sheet', { parallel: false }, (done) => {

        mockedSheetPrototype.expects('save').yields(null);

        const request = {
            method: 'POST',
            url: '/sheets',
            payload: JSON.stringify(createSheet)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(201);
            const replyPayload = JSON.parse(reply.payload);
            expect(Object.keys(replyPayload).length).to.equal(7);
            expect(replyPayload._id).to.exist();
            expect(replyPayload.name).to.equal('name');
            expect(replyPayload.archetype).to.equal('archetype');
            expect(replyPayload.appearance).to.equal('appearance');
            expect(replyPayload.skills).to.equal(createSheet.skills);
            expect(replyPayload.createdAt).to.exist();
            expect(replyPayload.updatedAt).to.exist();
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedSheetPrototype.expects('save').yields(new Error());

        const request = {
            method: 'POST',
            url: '/sheets',
            payload: JSON.stringify(createSheet)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on invalid sheet', { parallel: false }, (done) => {

        mockedSheetPrototype.expects('save').yields(null);

        const request = {
            method: 'POST',
            url: '/sheets',
            payload: JSON.stringify(invalidSheet)
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
            plugin: '../../lib/api/sheets'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
