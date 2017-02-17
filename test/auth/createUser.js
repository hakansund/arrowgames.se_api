'use strict';

const Code = require('code');
const Lab = require('lab');
require('sinon-mongoose');
const Server = require('../../lib');
const Path = require('path');

const Factories = require('./factories');
const Mocks = require('./mocks');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.experiment;
const it = lab.test;

const internals = {};

describe(' POST /users', () => {

    let server;
    const createUser = Factories.createUser();
    const dbUser = Factories.dbUser();
    const invalidUser = Factories.invalidUser();
    const mockedUser = Mocks.mockedUser;
    const mockedUserPrototype = Mocks.mockedUserPrototype;
    const mockedBcrypt = Mocks.mockedBcrypt;

    lab.after((done) => {

        done();
    });

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

    it('creates a user', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null);
        mockedUserPrototype.expects('save').yields(null);
        mockedBcrypt.expects('hash').yields(null, 'password123');

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(201);
            expect(JSON.parse(reply.payload)._id).to.exist();
            expect(JSON.parse(reply.payload).username).to.equal(createUser.username);
            expect(JSON.parse(reply.payload).password).to.equal(createUser.password);
            done();
        });
    });

    it('fails on bad request on save', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null);
        mockedUserPrototype.expects('save').yields(new Error());
        mockedBcrypt.expects('hash').yields(null, 'password');

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on invalid user', { parallel: false }, (done) => {

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(invalidUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails when username exists', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null, createUser);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            expect(JSON.parse(reply.payload).message).to.equal('Username taken');
            done();
        });
    });

    it('fails on bad request on find', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(new Error(), createUser);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });

    });

    it('fails if password generation fails', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null);
        mockedBcrypt.expects('hash').yields(new Error(), null);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: createUser,
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            expect(JSON.parse(reply.payload).error).to.equal('Bad Request');
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
