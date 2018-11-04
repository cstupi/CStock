'use strict';
const config = require('../config');
const pg = require('pg');
const pool = new pg.Pool({
      host : config.Database.Host,
      user : config.Database.User,
      password : config.Database.Password,
      database : config.Database.Name,
      port: config.Database.Port
});
module.exports = {
      query: async function(text, values) {
            const client = await pool.connect()
            let res
            try {
              await client.query('BEGIN')
              try {
                res = await client.query(text, values)
                await client.query('COMMIT')
              } catch (err) {
                await client.query('ROLLBACK')
                throw err
              }
            } finally {
              client.release()
            }
            return res
      }
   }
