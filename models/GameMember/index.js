'use strict';

const db = require('../Database');

const SELECT = 'SELECT "Game" AS "Game", "User" AS "User", Admin AS IsAdmin FROM "GameMembers"';

async function AddMember(gId, uId, isAdmin = false){
    return await db.query('INSERT INTO "GameMembers" ("Game","User","Admin","JoinedAt") VALUES ($1,$2,$3,$4)', 
        [gId, uId, isAdmin, new Date().toUTCString()]);
}
async function RemoveMember(gId, uId){
    return await db.query('DELETE FROM public."GameMembers" WHERE "User" = $1 AND "Game" = $2', [uId, gId]);
}
async function GetMembers(gId){
    return (await db.query(`${SELECT} WHERE Game = $1`, [gId])).rows;
}
async function GetGames(uId){
    return (await db.query(`${SELECT} WHERE User = $1`, [uId])).rows;
}
class GameMember {
    constructor() {
        this.User = null;
        this.Game = null;
        this.IsAdmin = false;
        this.JoinedAt = null;
    }
    static Create(gId, uId, isAdmin){
        return AddMember(gId, uId, isAdmin);
    }
    static GetMembers(gId){
        return GetMembers(gId);
    }
    static GetGames(uId){
        return GetGames(uId);
    }
    static Delete(gId, uId){
        return RemoveMember(gId,uId);
    }
}
module.exports = GameMember;