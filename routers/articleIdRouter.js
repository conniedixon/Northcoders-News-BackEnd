const express = require("express");
const articleIdRouter = express.Router();

const {
  getArticleById,
  incrementArticleVotes
} = require("../controllers/articlesControllers.js");

const { articleCommentsRouter } = require("./articleCommentsRouter");

articleIdRouter
  .route("/")
  .get(getArticleById)
  .patch(incrementArticleVotes)
  .all(
    (invalidMethod = (req, res, next) => {
      res.status(405).send({ msg: "Invalid method" });
    })
  );

articleIdRouter.use("/comments", articleCommentsRouter);

module.exports = { articleIdRouter };
