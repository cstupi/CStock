'use strict';

const User = require('../../models/User');

const Joi = require('joi');

const config = require('../../config');

const createUserSchema = Joi.object({
    Email: Joi.string().email().required(),
    Password: Joi.string().required()
});
// Uses server cache as this is for small project. Use redis.

module.exports = [{
    method: 'POST',
    path:'/api/user/register',
    config: {
        handler: async (req, res) => {
            if(await User.GetByEmail(req.Email))
                return req.response().code(409);
            const user = await User.Create(req.payload);
            const sid = user.Id;
            await req.server.app.cache.set(sid, { user }, 0);
            
            req.cookieAuth.set({ sid });
            return res.response().code(204);
        },
        validate: {
            payload: createUserSchema
        }
    }
},
{
    method: 'POST',
    path:'/api/user/login',
    config: {
        auth: { mode: 'try', strategy: 'session' }, 
        plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: async (req, res) => {
            let user = await User.Authenticate(req.payload);
            if(!user)
                return res.response().code(403);
            const sid = user.Id;
            await req.server.app.cache.set(sid, { user }, 0);
            console.log(req.auth);
            req.cookieAuth.set({ sid });

           // console.log(req.cookieAuth);
            
            return res.response().code(204);
        },
        validate: {
            payload: createUserSchema
        }
    }
},
{
    method: 'GET',
    path: '/api/user/logout',
    config: {
        handler: async (req, res) => {
            if(req.auth.isAuthenticated){
                console.log(`Logging out: `,req.auth);
            }
            req.server.app.cache.drop(req.state[config.Cache.name].sid);
            req.cookieAuth.clear();
            return h.redirect('/');
        }
    }
}]