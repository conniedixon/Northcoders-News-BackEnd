const knex = require("../db/connection.js");

const fetchArticleById = query => {
  const { article_id } = query;
  return knex
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id ${article_id}`
        });
      }
      return article;
    });
};

const fetchArticleVotes = (query, body) => {
  const { article_id } = query;
  const { inc_votes } = body;
  return knex("articles")
    .select("*")
    .where({ article_id })
    .increment("votes", inc_votes)
    .returning("*");
  // .then(response => {
  //   return reso
  //   console.log(response, "<--- response");
  // });
};

module.exports = { fetchArticleById, fetchArticleVotes };

//SELECT articles.* COUNT(article_id) AS "comment_count" FROM "articles" WHERE ("article_id", "=", article_id)
