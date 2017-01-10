'use strict';

module.exports.invalidRule = () => {

    return {
        invalid: true
    };
};

module.exports.validRule = () => {

    return {
        title: 'title',
        text: 'text'
    };
};
