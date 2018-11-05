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
}
];