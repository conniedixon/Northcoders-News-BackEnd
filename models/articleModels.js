const knex = require("../db/connection");

const fetchArticleById = params => {
  const { article_id } = params;
  return knex
    .first("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(article => {
      if (!article) {
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
      return response[0];
    });
};

const fetchAllComments = query => {
  const { article_id } = query;
  return knex("comments")
    .select("*")
    .where("comments.article_id", article_id);
};

const sendAComment = (query, comment) => {
  const { article_id } = query;
  return knex("comments")
    .where({ article_id })
    .insert({
      body: comment.body,
      author: comment.username,
      article_id: article_id
    })
    .returning("*")
    .then(([comment]) => {
      return comment;
    });
};

const fetchAllArticles = ({
  order = "desc",
  sort_by = "created_at",
  author,
  topic
}) => {
  return knex
    .select("articles.*")
    .from("articles")
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .modify(query => {
      if (topic) query.where({ "articles.topic": topic });
      if (author) query.where({ "articles.author": author });
    })
    .then(articles => {
      if (!articles) {
        Promise.reject({ status: 404, msg: "Page not found" });
      }
      return articles;
    });
};

module.exports = {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment,
  fetchAllArticles
};
