// If private.config.js doesnt exist use environment variables
// TODO:
/*
    Add Cache section
*/
let config = {
    url: process.env.URL || 'localhost',
    port: process.env.PORT || 8000,
    env: process.env.ENV || 'dev',
    cookie: process.env.COOKIE || 'CStock',
    cookiePassword: process.env.COOKIEPASSWORD,
    password: process.env.PASSWORD,
    DataProvider: {
        Token: process.env.DATA_TOKEN,
        Key: process.env.DATA_KEY,
        IV: process.env.DATA_IV,
        User: process.env.DATA_USER
    },
    Cache: {
        name: 'cstock'
    },
    Database: {
        Host: process.env.DB_HOST || 'localhost',
        Port: process.env.DB_PORT || 3006,
        User: process.env.DB_USER,
        Password: process.env.DB_PASSWORD,
        Name: process.env.DB_NAME || 'CStock'
    }
};
const fs = require('fs');
if (fs.existsSync('private.config.js')){
    config = require('./private.config')
}
module.exports = config;