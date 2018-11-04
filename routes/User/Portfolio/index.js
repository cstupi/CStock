'use strict';

const User = require('../../models/User');

const Joi = require('joi');

module.exports = [{
    method: 'GET',
    path:'/api/user/{user}/games',
    config: {
        handler: async (req, res) => {
            if(User.req.params.user)
            return await User.Create(req.payload);
        },
        validate: {
            params: {
                user: Joi.string().required()
            }
        }
    }
}];