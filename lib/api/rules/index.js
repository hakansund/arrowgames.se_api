'use strict';

exports.register = (server, options, next) => {

    server.route(require('./routes/createRule'));
    server.route(require('./routes/getRules'));
    server.route(require('./routes/updateRule'));
    server.route(require('./routes/getRule'));
    server.route(require('./routes/deleteRule'));

    return next();
};

exports.register.attributes = {
    name: 'rules'
};
