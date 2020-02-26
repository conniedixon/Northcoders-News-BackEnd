const knex = require("../db/connection");

const fetchTopics = () => {
  return knex("topics").select("*");
};

const checkTopicExists = topic => {
  return knex("topics").select("*")
    .modify(query => {
      if (topic) query.where({ topic });
    })
    .then(rows => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `topic '${topic}' does not exist` });
      }
    });
};

module.exports = { fetchTopics, checkTopicExists };
