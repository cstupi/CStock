'use strict'

const Transaction = require('../../models/Transaction');
const Order = require('../../models/Order');
const Asset = require('../../models/Asset');

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
async function CreateTransaction(trans, user){
    let order = await Order.Get(trans.Order);
    if(!order || order.Owner !== user)
        throw 'Unauthorized Exception';
    await Transaction.Create(trans.Order, trans.Count, trans.Price);
    if(order.TransactionType == 'BUY'){
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
}
module.exports = [
{
    method: 'POST',
    path: '/api/transaction',
    config: {
        auth: { mode: 'required' },
        handler: async (req, res) => {
            try {
                CreateTransaction(req.payload, req.auth.credentials.Id);
            } catch(err){
                if(err === 'Unauthorized Exception')
                    return res.response('Can only complete owned orders').code(401);
                throw err;
            }
        },
        validate: {
            payload: transValidation
        }
    }
}
];