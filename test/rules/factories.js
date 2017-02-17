'use strict';

module.exports.invalidRule = () => {

    return {
        invalid: true
    };
};

module.exports.createRule = () => {

    return {
        _subject: '507f1f77bcf86cd799439011',
        title: 'title',
        text: 'text'
    };
};

module.exports.invalidSubject = () => {

    return {
        invalid: true
    };
};

module.exports.validSubject = () => {

    return {
        name: 'valid name'
    };
};

module.exports.dbRule = () => {

    return {
        _id: '507f1f77bcf86cd799439011',
        _subject: '507f1f77bcf86cd799439011',
        title: 'title',
        text: 'text',
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
};
