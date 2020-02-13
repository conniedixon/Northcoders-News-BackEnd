const knex = require("../db/connection.js");

fetchAllComments = query => {
  const { article_id } = query;
  console.log(article_id);
  return knex("comments")
    .select("*")
    .where("articles.article_id", article_id);
};

module.exports = { fetchAllComments };
