'use strict';

module.exports.invalidRule = () => {

    return {
        invalid: true
    };
};

module.exports.validRule = () => {

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
