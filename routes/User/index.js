'use strict';

const User = require('../../models/User');

const Joi = require('joi');
const jwt = require('jsonwebtoken');
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
        auth: false,
        handler: async (req, res) => {
            if(await User.GetByEmail(req.Email))
                return req.response().code(409);
            await User.Create(req.payload);
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
        auth: false, 
        handler: async (req, res) => {
            let user = await User.Authenticate(req.payload);
            console.log(user);
            if(!user)
                return res.response().code(401);
            delete user.Password;
            user.Token = jwt.sign(user, config.password, {algorithm: 'HS256'});
            return user;
        },
        validate: {
            payload: createUserSchema
        }
    }
}]