'use strict';

module.exports.invalidSheet = () => {

    return {
        invalid: true
    };
};

module.exports.validSheet = () => {

    return {
        name: 'name',
        archetype: 'archetype',
        appearance: 'appearance',
        skills: {
            fighting: 1,
            movement: 1,
            social: 1,
            learning: 1,
            tech: 1
        }
    };
};
