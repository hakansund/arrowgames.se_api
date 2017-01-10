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

describe(' PATCH /sheets/{id}', () => {

    let server;
    const validSheet = Factories.validSheet();
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

    it('updates a sheet', { parallel: false }, (done) => {

        SheetMock.expects('findOneAndUpdate')
                  .yields(null, validSheet);

        const request = {
            method: 'PATCH',
            url: '/sheets/111111111111111111111111',
            payload: JSON.stringify(validSheet)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload).sheet).to.equal(validSheet);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        SheetMock.expects('findOneAndUpdate')
                  .yields(new Error(), null);

        const request = {
            method: 'PATCH',
            url: '/sheets/111111111111111111111111',
            payload: JSON.stringify(validSheet)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no sheet', { parallel: false }, (done) => {

        SheetMock.expects('findOneAndUpdate')
                  .yields(null, null);

        const request = {
            method: 'PATCH',
            url: '/sheets/111111111111111111111111',
            payload: JSON.stringify(validSheet)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('Sheet not found!');
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
