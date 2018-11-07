'use strict';
const config = require('../../config');
const Data = require('../../models/Quote');
const Joi = require('Joi');

module.exports = [
    {
        method: 'GET',
        path:'/api/quote/{identifier}',
        config: {
            auth: false,
            handler: async (req, res) => {
                return await Data.Quote(req.params.identifier);
            },
            validate: {
                params: {
                    identifier: Joi.string()
                }
            }
        }
    },
    {
        method: 'GET',
        path:'/api/quote/historical/{identifier}',
        config: {
            auth: false,
            handler: async (req, res) => {
                return await Data.AdjustedSeries(req.params.identifier);
            },
            validate: {
                params: {
                    identifier: Joi.string()
                }
            }
        }
    },
    {
        method: 'GET',
        path:'/api/quote/search/{term}',
        config: {
            auth: false,
            handler: async (req, res) => {
                return await Data.Search(req.params.term);
            },
            validate: {
                params: {
                    term: Joi.string()
                }
            }
        }
    }
];