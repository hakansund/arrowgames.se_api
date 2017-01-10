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
    const validUser = Factories.validUser();
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

        mockedUser.expects('findOne')
                  .yields(null);
        mockedUserPrototype.expects('save')
                           .yields(null);
        mockedBcrypt.expects('hash')
                    .yields(null, 'password');

        const request = {
            method: 'POST',
            url: '/users',
            credentials: validUser,
            payload: JSON.stringify(validUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(201);
            expect(JSON.parse(reply.payload).user.username).to.equal(validUser.username);
            done();
        });
    });

    it('fails on bad request on save', { parallel: false }, (done) => {

        mockedUser.expects('findOne')
                  .yields(null);
        mockedUserPrototype.expects('save')
                           .yields(new Error());
        mockedBcrypt.expects('hash')
                   .yields(null, 'password');

        const request = {
            method: 'POST',
            url: '/users',
            credentials: validUser,
            payload: JSON.stringify(validUser)
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
            credentials: validUser,
            payload: JSON.stringify(invalidUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails when username exists', { parallel: false }, (done) => {

        mockedUser.expects('findOne')
                  .yields(null, validUser);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: validUser,
            payload: JSON.stringify(validUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            expect(JSON.parse(reply.payload).message).to.equal('Username taken');
            done();
        });
    });

    it('fails on bad request on find', { parallel: false }, (done) => {

        mockedUser.expects('findOne')
                  .yields(new Error(), validUser);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: validUser,
            payload: JSON.stringify(validUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });

    });

    it('fails if password generation fails', { parallel: false }, (done) => {

        mockedUser.expects('findOne')
                  .yields(null);
        mockedBcrypt.expects('hash')
                    .yields(new Error(), null);

        const request = {
            method: 'POST',
            url: '/users',
            credentials: validUser,
            payload: JSON.stringify(validUser)
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
