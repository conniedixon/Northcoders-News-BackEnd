const {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendAComment,
  fetchAllArticles
} = require("../models/articleModels");

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

const incrementArticleVotes = (req, res, next) => {
  const query = req.params;
  const body = req.body;
  fetchArticleVotes(query, body)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

const getAllComments = (req, res, next) => {
  const query = req.params;
  fetchAllComments(query)
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

const getAllArticles = (req, res, next) => {
  const query = req.query;
  fetchAllArticles(query)
    .then(articles => {
      res.status(200).send({ articles });
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
