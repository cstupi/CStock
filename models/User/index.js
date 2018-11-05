
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const db = require('../Database');
async function hashPassword(password) {
    try {
        let salt = await bcrypt.genSalt(10);
        let v = await bcrypt.hash(password, salt);
        return v;
    } catch(err){
        console.log(err);
    }
}
async function Login(data) {
    console.log('Logging in: ', data.Email);
    let res = await GetByEmail(data.Email);
    if(res == null)
        return null;
    if(!(await bcrypt.compare(data.Password, res.Password)))
        return false;
    return res;
}
async function Create(data){
    let user = new User();
    user.Email = data.Email;
    let hash = await hashPassword(data.Password);
    user.Password = hash;
    user.Id = uuidv4();      
    await db.query(
        'INSERT INTO public.user (Id, Email, Password) VALUES ($1,$2,$3)', 
        [user.Id, user.Email, user.Password]
        );
    return user;
}
async function GetByEmail(email){
    let res = await db.query(
        'SELECT Id AS "Id", Email AS "Email", Password AS "Password" FROM public.User WHERE email = $1', 
        [email]
        );
    if(res.rows.length > 1)
        throw `Bad user data when looking up ${email}`;
    if(res.rows.length === 0)
        return null;
    return res.rows[0];
}
async function Get(id){
    return await db.query(
        'SELECT Id AS "Id", Email AS "Email", Password AS "Password" FROM public.User WHERE Id = $1', 
        [id]
        ).rows;
}
async function Delete(id){
    await db.query('DELETE FROM public.User WHERE Id = $1',[id]);
}
class User {
    constructor(){
        this.Id = null;
        this.Email = null;
        this.Password = null;
    }
    static List(search){
        // Search the db
    }
    static Get(id){
        return Get(id);
    }
    static GetByEmail(email){
        return GetByEmail(email);
    }
    static Delete(id){
        return Delete(id);
    }
    static Update(user){
        // Find and update
    }
    static Create(data){
        return Create(data);
    }
    static Authenticate(data){
        return Login(data);
    }   
    toJSON(){
        return {
            Id: this.Id,
            Email: this.Email
        };
    }
}
module.exports = User;