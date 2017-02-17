'use strict';

exports.register = (server, options, next) => {

    server.route(require('./routes/createRule'));
    server.route(require('./routes/getRules'));
    server.route(require('./routes/updateRule'));
    server.route(require('./routes/getRule'));
    server.route(require('./routes/deleteRule'));
    server.route(require('./routes/getSubjects'));
    server.route(require('./routes/createSubject'));
    server.route(require('./routes/updateSubject'));
    server.route(require('./routes/getSubject'));
    server.route(require('./routes/deleteSubject'));

    return next();
};

exports.register.attributes = {
    name: 'rules'
};
