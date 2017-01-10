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

describe(' GET /users', () => {

    let server;
    const mockedUser = Mocks.mockedUser;
    const validUser = Factories.validUser();

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

    it('returns users', { parallel: false }, (done) => {

        const usersList = [validUser, validUser];

        mockedUser.expects('find')
                  .yields(null, usersList);

        server.inject({ url: '/users', credentials: validUser }, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.equal(usersList);
            done();
        });
    });

    it('fails on bad request', { parallel: false }, (done) => {

        mockedUser.expects('find')
                  .yields(new Error(), null);

        server.inject({ url: '/users', credentials: validUser }, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on no users', { parallel: false }, (done) => {

        mockedUser.expects('find')
                  .yields(null, []);

        server.inject({ url: '/users', credentials: validUser }, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('No users found');
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
