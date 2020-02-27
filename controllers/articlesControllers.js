const {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment,
  fetchAllArticles
} = require("../models/articleModels");

const {checkTopicExists} = require ("../models/topicsModels")
const {checkUserExists} = require ("../models/userModels")

const getArticleById = (req, res, next) => {
  const params = req.params;
  fetchArticleById(params)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const getAllArticles = (req, res, next) => {
  const {topic, author} = req.query;
  console.log(topic, author)
  Promise.all([
    fetchAllArticles(req.query),
    checkTopicExists(topic),
    checkUserExists(author)
  ])
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const incrementArticleVotes = (req, res, next) => {
  const params = req.params;
  const body = req.body;
  
  fetchArticleVotes(params, body)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const getAllComments = (req, res, next) => {
  const params = req.params;
  const query = req.query
  fetchAllComments(params, query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const postComment = (req, res, next) => {
  const query = req.params;
  const comment = req.body;
  sendAComment(query, comment)
    .then(postedComment => {
      res.status(201).send({ postedComment });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = {
  getArticleById,
  incrementArticleVotes,
  getAllComments,
  postComment,
  getAllArticles
};
