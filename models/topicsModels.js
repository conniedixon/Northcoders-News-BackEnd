const knex = require("../db/connection");

const fetchTopics = () => {
  return knex("topics").select("*");
};

const checkTopicExists = topic => {
  console.log(topic)
  return knex("topics").select("*")
    .modify(query => {
      if (topic) query.where({ slug: topic });
    })
    .then(rows => {
      console.log(rows)
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: `topic '${topic}' does not exist` });
      }
      else return rows
    });
};

module.exports = { fetchTopics, checkTopicExists };
