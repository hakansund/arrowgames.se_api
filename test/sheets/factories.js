'use strict';

module.exports.invalidSheet = () => {

    return {
        invalid: true
    };
};

module.exports.createSheet = () => {

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

module.exports.dbSheet = () => {

    return {
        _id: '507f1f77bcf86cd799439011',
        name: 'name',
        archetype: 'archetype',
        appearance: 'appearance',
        skills: {
            fighting: 1,
            movement: 1,
            social: 1,
            learning: 1,
            tech: 1
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
    };
};
