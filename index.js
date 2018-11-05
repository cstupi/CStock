'use strict';

const Hapi = require('hapi');
const Auth = require('./routes/User')
const config = require('./config');
let server = null;

if(config.env == 'dev'){
    server = Hapi.server({
        host: config.url,
        port: config.port,
        debug: { request: ['error']}
    });
} else {
    server = Hapi.server({
        host: config.url,
        port: config.port
    });
}

// Use cache for any real project so we dont have to hit db to check user
const validate = async (claims, req) => {
    if(!require('./models/User').Get(claims.Id))
        return { isValid: false };
    return { isValid: true };
};

async function start() {
    try 
    {
         /*
        JWT
        */
        await server.register(require('hapi-auth-jwt2'));
        server.auth.strategy('jwt','jwt', {
            key: config.password,
            validate: validate,
            verifyOptions: { algorithms: ['HS256']}
        });
        server.auth.default('jwt');
        /*
        ROUTES
        */
        server.route(Auth);
        server.route(require('./routes/Game'));
        server.route(require('./routes/GameMember'));
        server.route(require('./routes/Order'));
        server.route(require('./routes/Transaction'));
    //    server.route(require('./routes/Quote'));
        server.route({
            method: 'GET',
            path: '/',
            config:{
                auth: { mode: 'required', strategy: 'jwt' }, 
                handler: (req, h) => {
                    console.log(req.auth.credentials);
                    return 'Hello, world!';
                }
            }
        });
        console.log('Starting');
        await server.start();
    } 
    catch(err)
    {
        console.log('Error', err);
        process.exit(1);
    }
    console.log('Server running at: ', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

start();