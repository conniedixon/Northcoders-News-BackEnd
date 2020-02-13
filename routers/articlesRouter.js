const express = require("express");
const articlesRouter = express.Router();

const {
  getArticleById,
  incrementArticleVotes
} = require("../controllers/articlesControllers.js");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(incrementArticleVotes);

module.exports = { articlesRouter };
