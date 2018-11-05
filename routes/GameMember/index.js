'use strict';

const GameMember = require('../../models/GameMember');
const Joi = require('joi');

const v = Joi.object({
    Game: Joi.string().guid().required(),
    User: Joi.string().guid(),
    IsAdmin: Joi.bool(),
    JoinedAt: Joi.date()
});

module.exports = [
    {
        method: 'GET',
        path: '/api/GameMember/games/{user}',
        config: {
            auth: { mode: 'required' },
            handler: async (req, res) => {

                return await GameMember.GetGames(req.params.user);
            },
            validate: {
                params: {
                    user: Joi.string().guid().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/GameMember/users/{game}',
        config: {
            auth: { mode: 'required' },
            handler: async (req, res) => {
                return await GameMember.GetMembers(req.params.game);
            },
            validate: {
                params: {
                    game: Joi.string().guid().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/GameMember',
        config: {
            auth: { mode: 'required' },
            handler: async (req, res) => {
                // Assume game has no password currently
                return await GameMember.Create(req.payload.Game, req.auth.credentials.Id, req.payload.IsAdmin);
            },
            validate: {
                payload: v
            }
        }
    }
];