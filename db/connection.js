const knexMaker = require("knex");
const ENV = process.env.NODE_ENV || 'development';

const dbConfig =  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');
    
const knex = knexMaker(dbConfig);
 

module.exports = knex