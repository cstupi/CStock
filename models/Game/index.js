'use strict';

const uuidv4 = require('uuid/v4');
const db = require('../Database');

const SELECT = 'SELECT Id AS "Id", Name AS "Name", StartingValue AS "StartingValue" FROM Game';

async function Create(game){
    await db.query(`INSERT INTO public.Game (Id, Name, Password, StartingValue) VALUES ($1,$2,$3,$4)`,
        [game.Id, game.Name, Game.Password, Game.StartingValue]);
    return game;
}
async function List(){
    return await db.query(SELECT).rows;
}
async function Get(id){
    let res = await db.query(`${SELECT} WHERE id = $1`,[id]);
    if(res.rows.length > 1)
        throw `Bad game data for id: ${id}`;
    if(res.rows.length == 0)
        return null;
    return res.rows[0];
}
async function Delete(gId){
    let res = db.query('DELETE FROM public.GameMembers WHERE Game = $1',[gId]);
    return db.query('DELETE FROM public.Game WHERE Id = $1', [gId]);
}
async function ListMembers(gId){
    return await db.query('SELECT Game AS "Game", User AS "User", Admin AS "Admin", JoinedAt AS "JoinedAt" FROM public.GameMembers');
}
async function AddMember(gId, uId, isAdmin = false){
    return await db.query('INSERT INTO public.GameMembers (Game,User,Admin,JoinedAt) VALUES ($1,$2,$3,$4)', 
        [gId, uId, isAdmin, new Date().toUTCString()]);
}
async function RemoveMember(uId, gId){
    return await db.query('DELETE FROM public.GameMembers WHERE User = $1 AND Game = $2', [uId, gId]);
}
class Game {
    constructor(){
        this.Name = null;
        this.Id = null;
        this.Password = null;
        this.StartingValue = 0;
        this.Portfolios = [];
    }
    toJSON(){
        return {
            Id: this.Id,
            Name: this.Name,
            StartingValue: this.StartingValue,
            Portfolios: this.Portfolios
        };
    }
    static List(){
        return List();
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
    static ListMembers(gId){
        return ListMembers(gId);
    }
    static AddMember(gId, uId, isAdmin){
        return AddMember(gId, uId, isAdmin);
    }
    static RemoveMember(uId, gId){
        return RemoveMember(uId, gId);
    }
}
module.exports = Game;