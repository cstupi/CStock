'use strict';

/*
TODO:
Allow user to customize starting asset symbol
*/
const uuidv4 = require('uuid/v4');
const db = require('../Database');

const SELECT = 'SELECT "Game"."Id" AS "Id", "Game"."Name" AS "Name", "Game"."StartingValue" AS "StartingValue" FROM public."Game"';

async function Create(game){
    game.Id = uuidv4();
    await db.query(`INSERT INTO "Game" ("Id", "Name", "Password", "StartingValue") VALUES ($1,$2,$3,$4)`,
        [game.Id, game.Name, game.Password, game.StartingValue]);
    return game;
}
async function List(user){
    if(user)
        return (await db.query(`${SELECT} JOIN "GameMembers" g on g."Game" = "Game"."Id" WHERE g."User" = $1`, [user])).rows;
    return (await db.query(SELECT)).rows;
}
async function Get(id){
    let res = await db.query(`${SELECT} WHERE "Id" = $1`,[id]);
    if(res.rows.length > 1)
        throw `Bad game data for id: ${id}`;
    if(res.rows.length == 0)
        return null;
    return res.rows[0];
}
async function Delete(gId){
    let res = db.query('DELETE FROM GameMembers WHERE Game = $1',[gId]);
    return db.query('DELETE FROM Game WHERE Id = $1', [gId]);
}

class Game {
    constructor(){
        this.Name = null;
        this.Id = null;
        this.Password = null;
        this.StartingValue = 0;
    }
    toJSON(){
        return {
            Id: this.Id,
            Name: this.Name,
            StartingValue: this.StartingValue
        };
    }
    static List(user){
        return List(user);
    }
    static Create(game){
        return Create(game);
    }
    static Get(gId){
        return Get(gId);
    }
    static Delete(gId){
        return Delete(gId);
    }
}
module.exports = Game;