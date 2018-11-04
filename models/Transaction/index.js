const db = require('../Database');
const uuidv4 = require('uuid/v4');
async function Create(oId, count, price){
    return await db.query('INSERT INTO public.Transaction (Id, Order, Count, Price, Date) VALUES ($1,$2,$3,$4,$5)',
    [uuidv4(), oId, count, price, new Date()])
}

// No counterparty for this simulation - everything just executes at current market rates
class Transaction {
    constructor(){
        this.Id;
        this.Count;
        this.Order;
        this.Price;
        this.Date = new Date();
    }
    static Create(oId, count, price){
        return Create(oId, count, price);
    }
}
module.exports = Transaction;