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

describe(' POST /login', () => {

    let server;
    const createUser = Factories.createUser();
    const invalidUser = Factories.invalidUser();
    const dbUser = Factories.dbUser();
    const mockedUser = Mocks.mockedUser;
    const mockedBcrypt = Mocks.mockedBcrypt;

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

    it('logs in', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null, dbUser);
        mockedBcrypt.expects('compare').yields(null, true);

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(200);
            expect(JSON.parse(reply.payload)).to.exist();
            done();
        });
    });

    it('fails on invalid user', { parallel: false }, (done) => {

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(invalidUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });
    });

    it('fails on invalid password', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null, dbUser);
        mockedBcrypt.expects('compare').yields(null, false);

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(401);
            expect(JSON.parse(reply.payload).message).to.equal('Wrong password');
            done();
        });
    });

    it('fails when user does not exists', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null, null);

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(404);
            expect(JSON.parse(reply.payload).message).to.equal('User not found');
            done();
        });
    });

    it('fails on bad request on find', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(new Error(), null);

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(createUser)
        };

        server.inject(request, (reply) => {

            expect(reply.statusCode).to.equal(400);
            done();
        });

    });

    it('fails on bad request on password compare', { parallel: false }, (done) => {

        mockedUser.expects('findOne').yields(null, dbUser);
        mockedBcrypt.expects('compare').yields(new Error(), null);

        const request = {
            method: 'POST',
            url: '/login',
            payload: JSON.stringify(createUser)
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
