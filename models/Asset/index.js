'use strict';
const db = require('../Database');

async function Create(User, Game, Identifier, Quantity, PricePerUnit){
    return await db.query('INSERT INTO public."Portfolio" ("User","Game","Identifier","Quantity","PricePerUnit") VALUES ($1,$2,$3,$4,$5)',
    [User,Game,Identifier,Quantity,PricePerUnit]);
}
async function Delete(User, Game, Identifier){
    return await db.query('DELETE FROM public."Portfolio" WHERE "User" = $1 AND "Game" = $2 AND "Identifier" = $3',
    [User, Game, Identifier]);
}
async function List(uId, gId){
    return (await db.query('SELECT "User" As "User", "Game" AS "Game", "Identifier" AS "Identifier", "Quantity" AS "Quantity", "PricePerUnit" AS "PricePerUnit" FROM "Portfolio" WHERE "User" = $1 AND "Game" = $2',
    [uId, gId])).rows;
}
async function Get(uId, gId, identifier){
    return (await db.query('SELECT "User" As "User", "Game" AS "Game", "Identifier" AS "Identifier", "Quantity" AS "Quantity", "PricePerUnit" AS "PricePerUnit" FROM "Portfolio" WHERE "User" = $1 AND "Game" = $2 AND "Identifier" = $3',
    [uId, gId, identifier])).rows[0];
}
async function Update(uId, gId, quantity, price, identifier){
    let asset = await Get(uId,gId, identifier);
    if(!asset){
        return await db.query('INSERT INTO "Portfolio" ("User", "Game", "Identifier", "Quantity", "PricePerUnit") VALUES ($1,$2,$3,$4,$5)',
            [uId, gId, identifier, quantity, price])
    }
    let value = asset.PricePerUnit * asset.Quantity;
    asset.Quantity += quantity;
    if(quantity > 0){
        // Just use average for cost basis
        asset.PricePerUnit = (value + (price * quantity)) / asset.Quantity;
    } else {
        asset.PricePerUnit = (value + (asset.PricePerUnit * quantity)) / asset.Quantity;
    }
    return await db.query('UPDATE "Portfolio" SET "Quantity" = $1, "PricePerUnit" = $2 WHERE "User" = $3 AND "Game" = $4 AND "Identifier" = $5',
        [asset.Quantity, asset.PricePerUnit,uId, gId, identifier]);
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
    static Get(uId, gId, identifier){
        return Get(uId, gId, identifier);
    }
    static List(uId, gId){
        return List(uId, gId);
    }
    static Update(uId, gId, quantity, price, identifier){
        return Update(uId, gId, quantity, price, identifier);
    }
}

module.exports = Asset;