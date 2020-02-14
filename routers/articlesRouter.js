const express = require("express");
const articlesRouter = express.Router();

const {
  getAllComments,
  postComment,
  getArticleById,
  incrementArticleVotes
} = require("../controllers/articlesControllers");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(incrementArticleVotes)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );

articlesRouter
  .route("/:article_id/comments")
  .get(getAllComments)
  .post(postComment)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );

module.exports = { articlesRouter };
