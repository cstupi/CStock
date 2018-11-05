'use strict';
const db = require('../Database');

async function Create(User, Game, Identifier, Quantity, PricePerUnit){
    return await db.query('INSERT INTO public."Portfolio" ("User","Game","Identifier","Quantity","PricePerUnit") VALUES ($1,$2,$3,$4,$5)',
    [User,Game,Identifier,Quantity,PricePerUnit]);
}
async function Delete(User, Game, Identifier){
    return await db.query('DELETE FROM public.Portfolio WHERE User = $1 AND Game = $2 AND Identifier = $3',
    [User, Game, Identifier]);
}
async function List(uId, gId){
    return await db.query('SELECT User As "User", Game AS "Game", Identifier AS "Identifier", Quantity AS "Quantity", PricePerUnit AS "PricePerUnit" FROM Portfolio WHERE User = $1 AND Game = $2',
    [uId, gId]);
}
async function Get(uId, gId, identifier){
    return await db.query('SELECT User As "User", Game AS "Game", Identifier AS "Identifier", Quantity AS "Quantity", PricePerUnit AS "PricePerUnit" FROM Portfolio WHERE User = $1 AND Game = $2 AND Identifier = $3',
    [uId, gId, identifier]);
}
async function Update(uId, gId, count, price, identifier){
    let asset = Get(uId,gId, identifier);
    if(!asset){
        return await db.query('INSERT INTO Portfolio (User, Game, Identifier, Quantity, PricePerUnit) VALUES ($1,$2,$3,$4,$5)',
            [uId, gId, identifier, quantity, price])
    }
    let value = asset.PricePerUnit * asset.Quantity;
    asset.Count += count;
    if(count > 0){
        // Just use average for cost basis
        asset.PricePerUnit = (value + (price * count)) / asset.Count;
    } else {
        asset.PricePerUnit = (value - (asset.PricePerUnit * count)) / asset.Count;
    }
    return await db.query('UPDATE Portfolio SET Count = $1, PricePerUnit = $2 WHERE user = $3 AND game = $4 AND identifier = $5',
        [asset.Count, asset.PricePerUnit,uId, gId, identifier]);
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
    static List(uId, gId){
        return Get(uId, gId);
    }
    static Update(uId, gId, count, price, identifier){
        return Update(uId, gId, count, price, identifier);
    }
}

module.exports = Asset;