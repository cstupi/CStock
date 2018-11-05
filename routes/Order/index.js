'use strict';

const Order = require('../../models/Order');
const uuidv4 = require('uuid/v4');
const Joi = require('joi');
const orderValidation = Joi.object({
    Id: Joi.string().guid(),
    Owner: Joi.string().guid().required(),
    Game: Joi.string().guid().required(),
    CreatedAt: Joi.date(),
    Quantity: Joi.number().required(),
    Limit: Joi.number(),
    ExpiresAt: Joi.date(),
    Reason: Joi.string(),
    Identifier: Joi.string(),
    OrderType: Joi.string(),
    TransactionType: Joi.string()
});

module.exports = [
{
    method: 'GET',
    path: '/api/order/{game}/{user}',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            if(req.query){
                console.log(req.query);
            }
            return await Order.GetForUser(req.auth.credentials.Id, req.params.game, req.query);
        }
    }
},
{
    method: 'PUT',
    path: '/api/order/{order}/status',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            let order = Order.Get(req.params.order);
            if(order.Owner != req.auth.credentials.Id)
                return res.response().code(403);
            return Order.UpdateStatus(order.Id, status);
        }
    }
},
{
    method: 'POST',
    path: '/api/order',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            let order = req.payload;
            order.Id = uuidv4();
            order.CreatedAt = new Date();
            order.Status = 'PENDING';
            return await Order.Create(order);
        },
        validate: {
            payload: orderValidation
        }
    }
}
];
