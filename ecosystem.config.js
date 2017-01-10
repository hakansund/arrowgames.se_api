'use strict';

module.exports = {

    apps : [

        {
            'name' : 'Arrow Games API',
            'script' : 'lib/start.js'
        }
    ],

    deploy : {
        production : {
            'user' : process.env.USER,
            'host' : 'arrowgames.se',
            'ref'  : 'origin/master',
            'repo' : 'git@github.com:hakansund/arrowgames.se_api.git',
            'path' : '~/arrowgames.se_api',
            'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
        }
    }
};
