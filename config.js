'use strict';
const config = {
    proxy: {
        rules: {
            '.*/test': 'http://localhost:9444/',
            '.*/yoda': 'http://localhost:9444/cdn'
        }
    }
};
module.exports = config;
