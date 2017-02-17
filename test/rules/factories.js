'use strict';

module.exports.invalidRule = () => {

    return {
        invalid: true
    };
};

module.exports.createRule = () => {

    return {
        title: 'title',
        text: 'text'
    };
};

module.exports.dbRule = () => {

    return {
        _id: '507f1f77bcf86cd799439011',
        title: 'title',
        text: 'text',
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
};
