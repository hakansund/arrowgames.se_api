'use strict';

const Server = require('./index');
const Path = require('path');

const internals = {};

internals.composeOptions = {
    relativeTo: __dirname
};

internals.manifest = {
    connections: [
        {
            port: 3001,
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, '../public')
                },
                cors: true
            }
        }
    ],
    registrations: [
        {
            plugin: './mongo'
        },
        {
            plugin: 'hapi-auth-jwt2'
        },
        {
            plugin: './api/auth'
        },
        {
            plugin: './api/sheets'
        },
        {
            plugin: './api/rules'
        }
    ]
};

Server.init(internals.manifest, internals.composeOptions, (err, server) => {

    if (err) {
        throw err;
    }

    console.log('Server started at: ' + server.info.uri);
});
