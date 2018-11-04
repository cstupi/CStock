'use strict';

const Hapi = require('hapi');
const Auth = require('./routes/User/Auth')
const config = require('./config');

const server = Hapi.server({
    host: config.url,
    port: config.port,
});


async function start() {
    try 
    {
        await server.register([{ plugin: require('hapi-auth-cookie') }]);
        /*
        SESSION
        */
        const cache = server.cache({ segment: 'sessions', expiresIn: 3*24*60*60*1000 });
        server.app.cache = cache;

        server.auth.strategy('session', 'cookie', {
            password: config.cookiePassword,
            cookie: config.cookie,
            redirectTo: '/login',
            isSecure: true,
            validateFunc: async (req, sess) => {
                console.log('Validation station');
                const cached = await cache.get(session.sid);
                const out = {
                    valid: !!cached
                };
                if(out.valid){
                    out.credentials = cached.user;
                }
                return out;
            }
        });

        server.auth.default('session');

        /*
        ROUTES
        */
        server.route(Auth);
        server.route({
            method: 'GET',
            path: '/',
            config:{
                auth: { mode: 'required', strategy: 'session' }, 
                plugins: { 'hapi-auth-cookie': { redirectTo: false } },
                handler: (req, h) => {
                console.log(req.auth);
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