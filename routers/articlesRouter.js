const express = require("express");
const articlesRouter = express.Router();

const { articleIdRouter } = require("./articleIdRouter");
const {
  getAllComments,
  postComment
} = require("../controllers/articlesControllers");

articlesRouter.use("/:article_id", articleIdRouter);

articlesRouter
  .route("/:article_id/comments")
  .get(getAllComments)
  .post(postComment);

module.exports = { articlesRouter };
