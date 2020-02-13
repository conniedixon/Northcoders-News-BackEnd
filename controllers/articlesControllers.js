const {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments
} = require("../models/articleModels.js");

const getArticleById = (req, res, next) => {
  const query = req.params;
  fetchArticleById(query)
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
  console.log(req);
  const query = req.query;
  fetchAllComments(query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = { getArticleById, incrementArticleVotes, getAllComments };
