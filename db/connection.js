const knexMaker = require("knex");

const dbConfig = require("../knexfile.js");
const knex = knexMaker(dbConfig);

module.exports = knex;
