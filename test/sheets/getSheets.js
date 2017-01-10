'use strict';

const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
require('sinon-mongoose');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Sheet = require('../../lib/api/sheets/model/Sheet');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' GET /sheets', () => {

    let server;
    const SheetMock = Sinon.mock(Sheet);

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

    it('returns sheets', { parallel: false }, (done) => {

        const validSheet = Factories.validSheet();
        const sheetsList = [validSheet, validSheet];

        SheetMock.expects('find')
                .yields(null, sheetsList);

        server.inject({ url: '/sheets' }, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(sheetsList);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        SheetMock.expects('find')
                .yields(new Error(), null);

        server.inject({ url: '/sheets' }, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no sheets', { parallel: false }, (done) => {

        SheetMock.expects('find')
                .yields(null, []);

        server.inject({ url: '/sheets' }, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No sheets found');
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
