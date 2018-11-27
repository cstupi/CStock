'use strict';


const Game = require('../../models/Game');
const GameMember = require('../../models/GameMember');
const Asset = require('../../models/Asset');

const Joi = require('joi');
const uuidv4 = require('uuid/v4');
const gameValidation = Joi.object({
    Name: Joi.string().required(),
    StartingValue: Joi.number().required(),
    Password: Joi.string()
});

module.exports = [
{
    method: 'GET',
    path:'/api/game',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            if(req.query && req.query.user)
                return await Game.List(req.query.user)
            return await Game.List();
        }
    }
},
{
    method: 'GET',
    path:'/api/game/{Id}',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            return await Game.Get(req.params.Id);
        },
        validate: {
            params: {
                Id: Joi.string().required()
            }
        }
    }
},
{
    method: 'POST',
    path: '/api/game',
    config: {
        auth: {mode: 'required'},
        handler: async (req, res) => {
            let game = req.payload;
            game.Id = uuidv4();
            game = await Game.Create(game);
            
            // Default to admin
            await GameMember.Create(game.Id, req.auth.credentials.Id, true);
            await Asset.Create(req.auth.credentials.Id, game.Id, 'USD', game.StartingValue, 1);
            return game;
        },
        validate: {
            payload: gameValidation
        }
    }
},
{
    method: 'GET',
    path:'/api/game/{gameId}/portfolio',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            if(!req.params.gameId)
                return res.response().code(400);
            let user = req.auth.credentials.Id;
            // We allow look up of other people's holdings
            if(req.query && req.query.user)
                user = req.query.user;
            return await Asset.List(user, req.params.gameId);
        }
    }
}
];