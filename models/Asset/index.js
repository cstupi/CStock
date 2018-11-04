'use strict';
const db = require('../Database');

async function Create(User, Game, Identifier, Quantity, PricePerUnit){
    return await db.query('INSERT INTO public.Portfolio (User,Game,Identifier,Quantity,PricePerUnit) VALUES ($1,$2,$3,$4,$5)',
    [User,Game,Identifier,Quantity,PricePerUnit]);
}
async function Delete(User, Game, Identifier){
    return await db.query('DELETE FROM public.Portfolio WHERE User = $1 AND Game = $2 AND Identifier = $3',
    [User, Game, Identifier]);
}
async function Get(uId, gId){
    return await db.query('SELECT User As "User", Game AS "Game", Identifier AS "Identifier", Quantity AS "Quantity", PricePerUnit AS "PricePerUnit" FROM Portfolio WHERE User = $1 AND Game = $2',
    [uId, gId]);
}

class Asset {
    constructor(identifier, qty, price, ownerId, gameId){
        this.Identifier = identifier;
        this.Quantity = qty;
        this.PricePerUnit = price;
        this.Owner = ownerId;
        this.Game = gameId;
    }
    static Create(User, Game, Identifier, Quantity, PricePerUnit){
        return Create(User,Game,Identifier,Quantity,PricePerUnit);
    }
    static Delete(uId, gId, Identifier){
        return Delete(uId, gId, Identifier);
    }
    static Get(uId, gId){
        return Get(uId, gId);
    }
}

module.exports = Asset;