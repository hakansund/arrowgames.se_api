'use strict';

const Code = require('code');
const Lab = require('lab');
require('sinon-mongoose');
const Server = require('../../lib');
const Path = require('path');
const Mocks = require('./mocks');

const Factories = require('./factories');

const internals = {};

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

describe(' DELETE /users', () => {

    let server;
    const mockedUser = Mocks.mockedUser;
    const createUser = Factories.createUser();
    const dbUser = Factories.dbUser();

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

    it('removes user', { parallel: false }, (done) => {

        mockedUser.expects('findOneAndRemove').yields(null, dbUser);

        const request = {
            method: 'DELETE',
            url: '/users/111111111111111111111111',
            credentials: createUser
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(dbUser);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedUser.expects('findOneAndRemove').yields(new Error(), null);

        const request = {
            method: 'DELETE',
            url: '/users/111111111111111111111111',
            credentials: createUser
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no user', { parallel: false }, (done) => {

        mockedUser.expects('findOneAndRemove').yields(null, null);

        const request = {
            method: 'DELETE',
            url: '/users/111111111111111111111111',
            credentials: createUser
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No user found');
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
            plugin: 'hapi-auth-jwt2'
        },
        {
            plugin: '../../lib/api/auth'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
