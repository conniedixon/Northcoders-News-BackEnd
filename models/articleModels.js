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

const fetchArticleVotes = ({article_id}, {inc_votes = 0}) => {
  console.log(article_id, inc_votes )
  return knex("articles")
  .select("*")
  .where("article_id",article_id)
  .increment("votes", inc_votes)
  .returning("*")
  .then(response => {
    console.log(response, '<-response')
    if (response.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No article found for id ${article_id}`
      })
    }
    else return response[0];
  });
};

const fetchAllComments = (params,  { sort_by = "created_at", order = "desc" }) => {
  const { article_id } = params;
  const sortBy = ["author", "title", "body", "topic", "created_at", "votes", "comment_count"]
  if (!sortBy.includes(sort_by)) return (Promise.reject({status:400, msg:"Bad Request"}))
  return knex("comments")
  .select("*").returning("*")
  .where("comments.article_id", article_id).orderBy(sort_by, order)
};


const checkArticleExists = params => {
  console.log("MADE IT")
  const {article_id} = params
  return knex("articles")
    .select("*")
    .where("article_id", article_id)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Path not found"
        });
      }
    });
}

const sendAComment = (query, comment) => {
  console.log(comment.body, comment.username)
  if (
    typeof comment.body !== "string" ||
    typeof comment.username !== "string"
  ) return Promise.reject({
      status: 400,
      msg: "Bad Request"
    });
  const { article_id } = query;
  return knex("comments")
    .where({ article_id })
    .insert({
      body: comment.body,
      author: comment.username,
      article_id: article_id,
      votes: 0,
    }).returning("*")
    .then(rows => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: `article ${article_id} does not exist` });
      else return rows[0].body
  
    });
};

const fetchAllArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  const sortBy = ["author", "title", "body", "topic", "created_at", "votes", "comment_count"]
  if (!sortBy.includes(sort_by)) return (Promise.reject({status:400, msg:"Bad Request"}))
  return knex
    .select("articles.*")
    .from("articles")
    .count("comments.comment_id AS comment_count")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(query => {
      if (topic) query.where({ "articles.topic": topic });
      if (author) query.where({ "articles.author": author });
    })
    .orderBy(sort_by, order)
};


module.exports = {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment,
  fetchAllArticles,
  checkArticleExists
};
