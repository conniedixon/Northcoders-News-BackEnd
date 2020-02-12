const knex = require("../db/connection");

const fetchTopics = () => {
  return knex("topics").select("*");
};

module.exports = { fetchTopics };
