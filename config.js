'use strict';
const config = {
    proxy: {
        rules: {
            '.*/test': 'http://localhost:9444/',
            '.*/yoda': 'http://localhost:9444/cdn',
            '.*/servlet/chatHttp/tos': 'http://localhost:9444/tosAccepted',
            '.*/servlet/chatHttp/guestConnect': 'http://localhost:9444/guestConnect'
        },
        default: "http://172.17.0.1:9443"
    }
};
module.exports = config;
