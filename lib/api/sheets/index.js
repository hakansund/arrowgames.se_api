'use strict';

exports.register = (server, options, next) => {

    server.route(require('./routes/createSheet'));
    server.route(require('./routes/getSheets'));
    server.route(require('./routes/updateSheet'));
    server.route(require('./routes/getSheet'));
    server.route(require('./routes/deleteSheet'));

    return next();
};

exports.register.attributes = {
    name: 'sheets'
};
