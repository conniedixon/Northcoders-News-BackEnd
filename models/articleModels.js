const knex = require("../db/connection");

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
    .returning("*")
    .then(response => {
      if (response.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No article found for id ${article_id}`
        });
      }
      return response;
    });
};

const fetchAllComments = query => {
  const { article_id } = query;
  return knex("comments")
    .select("*")
    .where("comments.article_id", article_id);
};

const sendAComment = () => {
  console.log("Made it!");
};

module.exports = {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment
};
