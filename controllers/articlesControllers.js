const {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment,
  fetchAllArticles,
  checkArticleExists
} = require("../models/articleModels");

const {checkTopicExists} = require ("../models/topicsModels")
const {checkUserExists} = require ("../models/userModels")

const getArticleById = (req, res, next) => {
  const {article_id} = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const getAllArticles = (req, res, next) => {
  const {topic, author} = req.query;
  Promise.all([
    fetchAllArticles(req.query),
    checkTopicExists(topic),
    checkUserExists(author)
  ])
    .then(([articles]) => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};

const incrementArticleVotes = (req, res, next) => {
  const {article_id} = req.params;
  const {inc_votes} = req.body;
  fetchArticleVotes(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      next(err);
    });
};

const getAllComments = (req, res, next) => {
  const params = req.params;
  const query = req.query
  Promise.all([fetchAllComments(params, query), checkArticleExists(params)] )
  .then(comments => {
    res.status(200).send({ comments });
  })
    .catch(err => {
      next(err);
    });
};

const postComment = (req, res, next) => {
  const params = req.params;
  const comment = req.body;
  Promise.all([sendAComment(params, comment), checkArticleExists(params)])
    .then(comment => {
      res.status(201).send( {comment});
    })
    .catch(err => {
      if (err.code === '23503') res.status(404).send({msg: "article not found"})
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
