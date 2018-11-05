'use strict'

const Transaction = require('../../models/Transaction');
const Order = require('../../models/Order');
const Asset = require('../../models/Asset');

const uuidv4 = require('uuid/v4');
const Joi = require('joi');

const transValidation = Joi.object({
    Id: Joi.string().guid(),
    Order: Joi.string().guid().required(),
    Count: Joi.number().integer().min(1).required(),
    Date: Joi.date(),
    Price: Joi.number().required()
});
async function Buy(uId, gId, count, price, identifier){
    await Asset.Update(uId, gId, count, price, identifier);
    await Asset.Update(uId, gId, (-1 * count * price), 1, 'USD');
}
module.exports = [
{
    method: 'POST',
    path: '/api/transaction',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            let trans = req.payload;
            let order = await Order.Get(trans.Order);
            if(!order || order.Owner !== req.auth.credentials.Id)
                return res.response().code(401);
            await Transaction.Create(trans.Order, trans.Count, trans.Price);
            if(order.TransactionType == 'SELL'){

            } else if(order.TransactionType == 'BUY'){
                await Buy(order.Owner, order.Game, trans.Count, trans.Price, order.Identifier);
                await Order.UpdateStatus(order.Id, 'COMPLETE');
            } else if(order.TransactionType == 'SELL'){
                await Buy(order.Owner, order.Game, (-1 * trans.Count), trans.Price, o.Identifier);
                await Order.UpdateStatus(order.Id, 'COMPLETE');
            } else if(order.TransactionType == 'BUYSHORT'){
// TODO
            } else if(order.TransactionType == 'SELLSHORT'){
// TODO
            }
            return true;
        },
        validate: {
            payload: transValidation
        }
    }
}
];