const db = require('../Database');
const uuidv4 = require('uuid/v4');

const OTypes = ['MARKET','LIMIT','STOP'];
const TTypes = ['BUY','SELL','BUYSHORT','SELLSHORT'];
const Statuses = ['COMPLETE', 'CANCELED', 'PENDING']

const GETQUERY = 'SELECT * FROM Order WHERE Owner = $1 AND Game = $2';
const LISTQUERY = 'SELECT * FROM Order WHERE Game = $1';

async function Create(o){
    if(Statuses.indexOf(o.Status) < 0)
        throw `Invalid Order Status for User: ${o.Owner} Game: ${o.Game} Identifier: ${o.Identifier}`;
    if(OTypes.indexOf(o.OrderType) < 0)
        throw `Invalid Order Type for User: ${o.Owner} Game: ${o.Game} Identifier: ${o.Identifier}`;
    if(TTypes.indexOf(o.TransactionType) < 0)
        throw `Invalid Transaction Type for User: ${o.Owner} Game: ${o.Game} Identifier: ${o.Identifier}`;
    o.CreatedAt = new Date();
    o.Id = uuidv4();
    return await db.query('INSERT INTO Order (Id, Owner, Game, CreatedAt, Quantity, Limit, ExpiresAt, Reason, Identifier, OrderType, TransactionType) VALUES' +
     'Values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', 
     [o.Id, o.Owner, o.Game, o.CreatedAt, o.Quantity, o.Limit, o.ExpiresAt, o.Reason, o.Identifier, o.OrderType,o.TransactionType]); 
}
async function UpdateStatus(oId, status){
    if(Statuses.indexOf(o.Status) < 0)
        throw `Invalid Order Status for User: ${o.Owner} Game: ${o.Game} Identifier: ${o.Identifier}`;
    
    return await db.query('UPDATE Order SET Status = $1 WHERE Id = $2',[status,oId]);
}
async function GetPending(uId, gId){
    return await db.query(`${GETQUERY} AND Status = "PENDING"`, [uId,gId]);
}
async function GetCompleted(uId, gId ){
    return await db.query(`${GETQUERY} AND Status = "COMPLETED"`, [uId,gId]);
}
async function GetCanceled(uId, gId){
    return await db.query(`${GETQUERY} AND Status = "CANCELED"`, [uId,gId]);
}
async function ListPending(gId){
    return await db.query(`${LISTQUERY} AND Status = "PENDING"`, [gId]);
}
async function ListCompleted(gId, count) {
    return await db.query(`${LISTQUERY} AND Status = "PENDING" OR Status = "Canceled"`, [gId]);
}
class Order {
    constructor(owner, identifier, oType, tType, qty, limit){
        this.Status = 'PENDING';
        this.OrderType = oType;
        this.TransactionType = tType;
        this.Quantity = qty;
        this.Identifier = identifier;
        this.Limit = limit;

        // No validation
        this.Owner = owner;
        this.ExpiresAt = null;
        this.Reason = null;
        this.Game = null;
        this.CreatedAt = new Date();
    }
    static Create(o){
        return Create(o);
    }
    static UpdateStatus(status){
        return UpdateStatus(status);
    }
    static GetPending(uId, gId){
        return GetPending(uId, gId);
    }
    static GetCompleted(uId, gId ){
        return GetCompleted(uId, gId);
    }
    static GetCanceled(uId, gId){
        return GetCanceled(uId, gId);
    }
    static ListPending(gId){
        return ListPending(gId);
    }
    static ListCompleted(gId, count) {
        return ListCompleted(gId, count);
    }
}
module.exports = Order;