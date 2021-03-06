const express = require("express");
const articlesRouter = express.Router();

const {
  getAllComments,
  postComment,
  getArticleById,
  incrementArticleVotes,
  getAllArticles
} = require("../controllers/articlesControllers");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  });

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(incrementArticleVotes)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  });

articlesRouter
  .route("/:article_id/comments")
  .get(getAllComments)
  .post(postComment)
  .all((req, res, next) => {
    res.status(405).send({ msg: "Invalid method" });
  });

module.exports = { articlesRouter };
