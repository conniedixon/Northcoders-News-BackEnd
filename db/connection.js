const knexMaker = require("knex");

const dbConfig =  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');

const knex = knexMaker(dbConfig);


module.exports = knex(dbConfig);