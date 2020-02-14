const {
  fetchArticleById,
  fetchArticleVotes,
  fetchAllComments,
  sendComment
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
  console.log(query, "<--- query", comment, "<--- comment");

  sendComment(query, body)
    .then(comment => {
      res.status(200).send({ comment });
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
  postComment
};
